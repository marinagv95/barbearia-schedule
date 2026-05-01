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

    if (!isValidSlotTime(start)) {
      throw new Error("Slot inválido (use 00 ou 30)");
    }

    if (start < now) throw new Error("Não pode agendar no passado");
    if (start.getDay() === 0) throw new Error("Domingo fechado");

    const holiday = getHolidayName(start);
    if (holiday) throw new Error(`Feriado (${holiday})`);

    const hour = start.getHours();
    if (hour < 8 || hour >= 18) throw new Error("Fora do horário");

    const slotStart = normalizeToSlotStart(start);
    const slotEnd = addMinutes(slotStart, 30);

    const count = await this.repo.countBySlot({
      ...(ignoreId ? { _id: { $ne: ignoreId } } : {}),
      scheduledAt: { $gte: slotStart, $lt: slotEnd },
    });

    if (count >= 3) throw new Error("Horário lotado");
  }
}