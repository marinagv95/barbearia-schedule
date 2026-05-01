import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

import { createAppointmentSchema } from "../schemas/appointment.schema";
import { updateStatusSchema } from "../schemas/updateStatus.schema";
import { rescheduleSchema } from "../schemas/reschedule.schema";

import { formatDate } from "../utils/formatDate";
import { isHoliday, getHolidayName } from "../utils/holidays";
import { toBrazilTime } from "../utils/date";

const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

const TIMEZONE = "America/Sao_Paulo";

export class AppointmentController {
  // CREATE
  async create(req: Request, res: Response) {
    try {
      const data = createAppointmentSchema.parse(req.body);

      const startUTC = new Date(data.scheduledAt);
      const start = toBrazilTime(startUTC);
      const now = toBrazilTime(new Date());
      const endUTC = addMinutes(startUTC, 30);

      if (start < now) {
        return res.status(400).json({
          message: "Não é possível agendar no passado",
        });
      }

      if (start.getDay() === 0) {
        return res.status(400).json({
          message: "Não atendemos aos domingos",
        });
      }

      const holidayName = getHolidayName(start);
      if (holidayName) {
        return res.status(400).json({
          message: `Não atendemos em feriados (${holidayName})`,
        });
      }

      const hour = start.getHours();
      if (hour < 8 || hour >= 18) {
        return res.status(400).json({
          message: "Fora do horário de funcionamento (08h às 18h)",
        });
      }

      const count = await Appointment.countDocuments({
        scheduledAt: {
          $gte: new Date(startUTC.getTime() - 30 * 60000),
          $lt: endUTC,
        },
      });

      if (count >= 3) {
        return res.status(409).json({
          message: "Horário lotado (máx. 3 atendimentos)",
        });
      }

      const phoneExists = await Appointment.findOne({ phone: data.phone });

      if (phoneExists) {
        return res.status(409).json({
          message: "Já existe um agendamento para esse telefone",
        });
      }

      const appointment = await Appointment.create({
        ...data,
        scheduledAt: startUTC,
      });

      return res.status(201).json(appointment);
    } catch (error: any) {
      return res.status(400).json({
        message: "Erro de validação",
        error: error.errors || error.message,
      });
    }
  }

  // LIST
  async list(req: Request, res: Response) {
    try {
      const appointments = await Appointment.find().sort({
        scheduledAt: 1,
      });

      const formatted = appointments.map((a) => ({
        ...a.toObject(),
        scheduledAtFormatted: formatDate(a.scheduledAt),
      }));

      return res.json(formatted);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro ao listar agendamentos",
        error: error.message,
      });
    }
  }

  // GET BY ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const appointment = await Appointment.findById(id);

      if (!appointment) {
        return res.status(404).json({
          message: "Agendamento não encontrado",
        });
      }

      return res.json({
        ...appointment.toObject(),
        scheduledAtFormatted: formatDate(appointment.scheduledAt),
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro ao buscar agendamento",
        error: error.message,
      });
    }
  }

  // UPDATE STATUS
  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = updateStatusSchema.parse(req.body);

      const appointment = await Appointment.findById(id);

      if (!appointment) {
        return res.status(404).json({
          message: "Agendamento não encontrado",
        });
      }

      const allowedTransitions: any = {
        pending: ["confirmed", "canceled"],
        confirmed: ["done", "canceled"],
        done: [],
        canceled: [],
      };

      if (!allowedTransitions[appointment.status].includes(status)) {
        return res.status(400).json({
          message: "Transição de status inválida",
        });
      }

      appointment.status = status;
      await appointment.save();

      return res.json(appointment);
    } catch (error: any) {
      return res.status(400).json({
        message: "Erro ao atualizar status",
        error: error.errors || error.message,
      });
    }
  }

  // RESCHEDULE
  async reschedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { scheduledAt } = rescheduleSchema.parse(req.body);

      const startUTC = new Date(scheduledAt);
      const start = toBrazilTime(startUTC);
      const now = toBrazilTime(new Date());
      const endUTC = addMinutes(startUTC, 30);

      const appointment = await Appointment.findById(id);

      if (!appointment) {
        return res.status(404).json({
          message: "Agendamento não encontrado",
        });
      }

      if (start < now) {
        return res.status(400).json({
          message: "Não é possível remarcar para o passado",
        });
      }

      if (start.getDay() === 0) {
        return res.status(400).json({
          message: "Não atendemos aos domingos",
        });
      }

      const holidayName = getHolidayName(start);
      if (holidayName) {
        return res.status(400).json({
          message: `Não atendemos em feriados (${holidayName})`,
        });
      }

      const hour = start.getHours();
      if (hour < 8 || hour >= 18) {
        return res.status(400).json({
          message: "Fora do horário de funcionamento",
        });
      }

      const count = await Appointment.countDocuments({
        _id: { $ne: id },
        scheduledAt: {
          $gte: new Date(startUTC.getTime() - 30 * 60000),
          $lt: endUTC,
        },
      });

      if (count >= 3) {
        return res.status(409).json({
          message: "Horário lotado (máx. 3 atendimentos)",
        });
      }

      appointment.scheduledAt = startUTC;
      await appointment.save();

      return res.json({
        message: "Agendamento remarcado com sucesso",
        appointment,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Erro ao remarcar agendamento",
        error: error.errors || error.message,
      });
    }
  }

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const appointment = await Appointment.findByIdAndDelete(id);

      if (!appointment) {
        return res.status(404).json({
          message: "Agendamento não encontrado",
        });
      }

      return res.json({
        message: "Agendamento removido com sucesso",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro ao deletar agendamento",
        error: error.message,
      });
    }
  }

  // AVAILABLE SLOTS (CORRIGIDO)
  async getAvailableSlots(req: Request, res: Response) {
    try {
      const { date } = req.query;

      if (!date || typeof date !== "string") {
        return res.status(400).json({
          message: "Data é obrigatória (YYYY-MM-DD)",
        });
      }

      const baseUTC = new Date(`${date}T00:00:00.000Z`);
      const baseBR = toBrazilTime(baseUTC);

      if (baseBR.getDay() === 0) {
        return res.status(400).json({
          message: "Barbearia fechada aos domingos",
        });
      }

      if (isHoliday(baseBR)) {
        return res.status(400).json({
          message: "Barbearia fechada em feriados",
        });
      }

      const dayStartUTC = new Date(`${date}T00:00:00.000Z`);
      const dayEndUTC = new Date(`${date}T23:59:59.999Z`);

      const appointments = await Appointment.find({
        scheduledAt: {
          $gte: dayStartUTC,
          $lte: dayEndUTC,
        },
      });

      const slots: string[] = [];

      for (let hour = 8; hour < 18; hour++) {
        for (let minute of [0, 30]) {
          const slotUTC = new Date(
            Date.UTC(
              baseBR.getFullYear(),
              baseBR.getMonth(),
              baseBR.getDate(),
              hour + 3, // 🔥 converte Brasil → UTC
              minute
            )
          );

          const slotEndUTC = addMinutes(slotUTC, 30);

          const count = appointments.filter((a) => {
            const time = new Date(a.scheduledAt).getTime();

            return (
              time >= slotUTC.getTime() - 30 * 60000 &&
              time < slotEndUTC.getTime()
            );
          }).length;

          if (count < 3) {
            slots.push(
              `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
            );
          }
        }
      }

      return res.json(slots);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro ao buscar horários disponíveis",
        error: error.message,
      });
    }
  }
}