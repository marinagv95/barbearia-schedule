import { Barber } from "../models/Barber";

export class BarberRepository {

  async create(data: any) {
    return Barber.create(data);
  }

  async findAll() {
    // 🔥 só barbeiros ativos
    return Barber.find({ active: true }).sort({ name: 1 });
  }

  async findById(id: string) {
    return Barber.findById(id);
  }

  async update(barber: any) {
    return barber.save();
  }
}