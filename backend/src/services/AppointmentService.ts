import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { getHolidayName } from "../utils/holidays";
import {
  isValidSlotTime,
  normalizeToSlotStart,
  addMinutes,
} from "../utils/timeSlots";
import { toBrazilTime } from "../utils/date";
import { AppError } from "../utils/appError";

export class AppointmentService {
  constructor(private repo = new AppointmentRepository()) {}

  async validateSlot(
    start: Date,
    barberId: string,
    ignoreId?: string
  ) {
    const now = new Date();

    const brDate = toBrazilTime(start);
    const brNow = toBrazilTime(now);

    if (brDate < brNow) {
      throw new AppError("Não pode agendar no passado", 400);
    }

    if (brDate.getDay() === 0) {
      throw new AppError("Domingo fechado", 400);
    }

    const holiday = getHolidayName(brDate);
    if (holiday) {
      throw new AppError(`Feriado (${holiday})`, 400);
    }

    const hour = brDate.getHours();

    if (hour < 8 || hour >= 18) {
      throw new AppError("Fora do horário (08h às 18h)", 400);
    }

    if (!isValidSlotTime(brDate)) {
      throw new AppError("Use intervalos de 30 minutos", 400);
    }

    const slotStartBR = normalizeToSlotStart(brDate);
    const slotEndBR = addMinutes(slotStartBR, 30);

    const slotStartUTC = new Date(slotStartBR.toISOString());
    const slotEndUTC = new Date(slotEndBR.toISOString());

    const count = await this.repo.countBySlot({
      barberId,
      scheduledAt: { $gte: slotStartUTC, $lt: slotEndUTC },
      ...(ignoreId ? { _id: { $ne: ignoreId } } : {}),
    });

    if (count >= 1) {
      throw new AppError("Horário ocupado", 409);
    }
  }
}