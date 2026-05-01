import { Appointment } from "../models/Appointment";

export class AppointmentRepository {
  async create(data: any) {
    return Appointment.create(data);
  }

  async findById(id: string) {
    return Appointment.findById(id);
  }

  async findAll() {
    return Appointment.find().sort({ scheduledAt: 1 });
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

  async countBySlot(filter: any) {
    return Appointment.countDocuments(filter);
  }

  async findByDateRange(start: Date, end: Date) {
    return Appointment.find({
      scheduledAt: { $gte: start, $lte: end },
    });
  }
}