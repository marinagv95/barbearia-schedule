import { Request, Response } from "express";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppointmentService } from "../services/AppointmentService";
import { formatDate } from "../utils/formatDate";
import { updateStatusSchema } from "../schemas/updateStatus.schema";
import { rescheduleSchema } from "../schemas/reschedule.schema";
import { createAppointmentSchema } from "../schemas/appointment.schema";

const repo = new AppointmentRepository();
const service = new AppointmentService();

/**
 * TIPAGEM CORRETA (resolve erro string | string[])
 */
type IdRequest = Request<{ id: string }>;

export class AppointmentController {

  // CREATE
  async create(req: Request, res: Response) {
    try {
      const data = createAppointmentSchema.parse(req.body);

      const start = new Date(data.scheduledAt);

      await service.validateSlot(start);

      const exists = await repo.findByPhone(data.phone);
      if (exists) {
        return res.status(409).json({
          message: "Telefone já tem agendamento",
        });
      }

      const appointment = await repo.create({
        ...data,
        scheduledAt: start,
      });

      return res.status(201).json({
        ...appointment.toObject(),
        scheduledAtFormatted: formatDate(appointment.scheduledAt),
      });
    } catch (err: any) {
      // Se for o erro específico de lotação, retorna 409
      if (err.message === "Horário lotado") {
        return res.status(409).json({
          message: "Erro de validação",
          error: err.message,
        });
      }

      // Para outros erros (como Zod ou campos faltando), mantém o 400
      return res.status(400).json({
        message: "Erro de validação",
        error: err.errors || err.message,
      });
    }
  }

  // LIST
  async list(req: Request, res: Response) {
    const data = await repo.findAll();

    return res.json(
      data.map((a) => ({
        ...a.toObject(),
        scheduledAtFormatted: formatDate(a.scheduledAt),
      }))
    );
  }

  // GET BY ID
  async getById(req: IdRequest, res: Response) {
    const appointment = await repo.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Não encontrado" });
    }

    return res.json({
      ...appointment.toObject(),
      scheduledAtFormatted: formatDate(appointment.scheduledAt),
    });
  }

  // UPDATE STATUS
  async updateStatus(req: IdRequest, res: Response) {
    const { status } = updateStatusSchema.parse(req.body);

    const appointment = await repo.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Não encontrado" });
    }

    const allowed: any = {
      pending: ["confirmed", "canceled"],
      confirmed: ["done", "canceled"],
      done: [],
      canceled: [],
    };

    if (!allowed[appointment.status].includes(status)) {
      return res.status(400).json({
        message: "Transição de status inválida",
      });
    }

    appointment.status = status;
    await repo.update(appointment);

    return res.json({
      ...appointment.toObject(),
      scheduledAtFormatted: formatDate(appointment.scheduledAt),
    });
  }

  // RESCHEDULE
  async reschedule(req: IdRequest, res: Response) {
    try {
      const { scheduledAt } = rescheduleSchema.parse(req.body);

      const start = new Date(scheduledAt);

      const appointment = await repo.findById(req.params.id);

      if (!appointment) {
        return res.status(404).json({ message: "Não encontrado" });
      }

      await service.validateSlot(start, req.params.id);

      appointment.scheduledAt = start;
      await repo.update(appointment);

      return res.json({
        message: "Remarcado com sucesso",
        appointment: {
          ...appointment.toObject(),
          scheduledAtFormatted: formatDate(appointment.scheduledAt),
        },
      });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  // DELETE
  async delete(req: IdRequest, res: Response) {
    const deleted = await repo.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Não encontrado" });
    }

    return res.json({ message: "Deletado com sucesso" });
  }

  // AVAILABLE SLOTS
  async getAvailableSlots(req: Request, res: Response) {
    const { date } = req.query;

    if (!date || typeof date !== "string") {
      return res.status(400).json({
        message: "Data obrigatória",
      });
    }

    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    const appointments = await repo.findByDateRange(start, end);

    const slots: string[] = [];

    for (let h = 8; h < 18; h++) {
      for (let m of [0, 30]) {
        const key = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

        const count = appointments.filter((a) => {
          const d = new Date(a.scheduledAt);
          const hh = String(d.getHours()).padStart(2, "0");
          const mm = d.getMinutes() < 30 ? "00" : "30";
          return `${hh}:${mm}` === key;
        }).length;

        if (count < 3) slots.push(key);
      }
    }

    return res.json(slots);
  }

}
