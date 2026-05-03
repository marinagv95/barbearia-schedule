import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { getHolidayName } from "../utils/holidays";
import {
  isValidSlotTime,
  normalizeToSlotStart,
  addMinutes,
} from "../utils/timeSlots";
import { toBrazilTime } from "../utils/date";

export class AppointmentService {
  constructor(private repo = new AppointmentRepository()) {}

  async validateSlot(
    start: Date,
    barberId: string,
    ignoreId?: string
  ) {
    const now = new Date();

    // 🔥 converte tudo pra Brasil
    const brDate = toBrazilTime(start);
    const brNow = toBrazilTime(now);

    // 🔥 passado
    if (brDate < brNow) {
      throw new Error("Não pode agendar no passado");
    }

    // 🔥 domingo
    if (brDate.getDay() === 0) {
      throw new Error("Domingo fechado");
    }

    // 🔥 feriado
    const holiday = getHolidayName(brDate);
    if (holiday) {
      throw new Error(`Feriado (${holiday})`);
    }

    // 🔥 horário funcionamento (Brasil)
    const hour = brDate.getHours();
    if (hour < 8 || hour >= 18) {
      throw new Error("Fora do horário");
    }

    // 🔥 valida slot (00 ou 30)
    if (!isValidSlotTime(brDate)) {
      throw new Error("Use intervalos de 30 minutos");
    }

    // 🔥 normaliza slot (Brasil)
    const slotStartBR = normalizeToSlotStart(brDate);
    const slotEndBR = addMinutes(slotStartBR, 30);

    // 🔥 converte pra UTC pra consultar no banco
    const slotStartUTC = new Date(slotStartBR.toISOString());
    const slotEndUTC = new Date(slotEndBR.toISOString());

    const count = await this.repo.countBySlot({
      barberId,
      scheduledAt: { $gte: slotStartUTC, $lt: slotEndUTC },
      ...(ignoreId ? { _id: { $ne: ignoreId } } : {}),
    });

    if (count >= 1) {
      throw new Error("Horário ocupado");
    }
  }
}