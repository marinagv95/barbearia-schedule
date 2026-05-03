import { Service } from "../models/Service";

export class ServiceRepository {
  async create(data: any) {
    return Service.create(data);
  }

  async findAll() {
    return Service.find({ active: true }).sort({ price: 1 });
  }

  async findById(id: string) {
    return Service.findById(id);
  }

  async findByName(name: string) {
    return Service.findOne({
      name: { $regex: name, $options: "i" },
      active: true,
    });
  }

  async update(id: string, data: any) {
    return Service.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Service.findByIdAndUpdate(id, { active: false });
  }
}