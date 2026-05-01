import { Appointment } from "../models/Appointment";

export class AppointmentRepository {
  async create(data: any) {
    return Appointment.create(data);
  }

  async findById(id: string) {
    return Appointment.findById(id);
  }

  // async findAll() {
  //   return Appointment.find().sort({ scheduledAt: 1 });
  // }


  async findAll() {
    return Appointment.find()
      .populate("userId", "name phone")
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

  // Corrigido: Ignora cancelados na contagem de slots
  async countBySlot(filter: any) {
    return Appointment.countDocuments({
      ...filter,
      status: { $ne: "canceled" }
    });
  }

  // Corrigido: Busca apenas agendamentos ativos para o cálculo de disponibilidade
  async findByDateRange(start: Date, end: Date) {
    return Appointment.find({
      scheduledAt: { $gte: start, $lte: end },
      status: { $ne: "canceled" }
    });
  }
}