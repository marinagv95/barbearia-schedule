import { Appointment } from "../models/Appointment";

export class AppointmentRepository {

  async create(data: any) {
    return Appointment.create(data);
  }

  async findById(id: string) {
    return Appointment.findById(id)
      .populate("userId", "name phone")
      .populate("barberId", "name");
  }

  async findAll() {
    return Appointment.find()
      .populate("userId", "name phone")
      .populate("barberId", "name")
      .sort({ scheduledAt: 1 });
  }

  async delete(id: string) {
    return Appointment.findByIdAndDelete(id);
  }

  async update(appointment: any) {
    return appointment.save();
  }

  async findByPhone(phone: string) {
    return Appointment.findOne({ phone });
  }

  // 🔥 conta apenas agendamentos ativos no slot (por barbeiro)
  async countBySlot(filter: any) {
    return Appointment.countDocuments({
      ...filter,
      status: { $ne: "canceled" },
    });
  }

  // 🔥 busca agendamentos do dia POR BARBEIRO
  async findByDateRange(
    start: Date,
    end: Date,
    barberId: string
  ) {
    return Appointment.find({
      barberId,
      scheduledAt: { $gte: start, $lte: end },
      status: { $ne: "canceled" },
    });
  }
}