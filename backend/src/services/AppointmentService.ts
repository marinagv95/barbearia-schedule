import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { getHolidayName } from "../utils/holidays";

const addMinutes = (date: Date, minutes: number) =>
  new Date(date.getTime() + minutes * 60000);

const isValidSlotTime = (date: Date) => {
  const m = date.getMinutes();
  return m === 0 || m === 30;
};

const normalizeToSlotStart = (date: Date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() < 30 ? 0 : 30, 0, 0);
  return d;
};


export class AppointmentService {
  constructor(private repo = new AppointmentRepository()) {}

  async validateSlot(start: Date, ignoreId?: string) {
    const now = new Date();

    // Validações básicas (formatos e passado)
    if (start < now) throw new Error("Não pode agendar no passado");
    
    // getUTCDay: 0 é domingo. Usar UTC para evitar erro de fuso no dia da semana.
    if (start.getUTCDay() === 0) throw new Error("Domingo fechado");

    // Valida horário de funcionamento em UTC (8h às 18h)
    const hour = start.getUTCHours();
    if (hour < 8 || hour >= 18) throw new Error("Fora do horário");

    // Normalização para o slot (ex: 13:00 até 13:30)
    const slotStart = new Date(start);
    slotStart.setUTCSeconds(0, 0);
    
    const slotEnd = new Date(slotStart);
    slotEnd.setUTCMinutes(slotStart.getUTCMinutes() + 30);

    const count = await this.repo.countBySlot({
      ...(ignoreId ? { _id: { $ne: ignoreId } } : {}),
      scheduledAt: { $gte: slotStart, $lt: slotEnd },
    });

    if (count >= 3) throw new Error("Horário lotado");
  }
}

