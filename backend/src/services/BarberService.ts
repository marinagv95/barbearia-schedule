import { BarberRepository } from "../repositories/BarberRepository";

export class BarberService {
  constructor(private repo = new BarberRepository()) {}

  async create(name: string) {
    if (!name) {
      throw new Error("Nome é obrigatório");
    }

    return this.repo.create({
      name,
      active: true,
    });
  }

  async list() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    const barber = await this.repo.findById(id);

    // 🔥 protege barbeiro inativo
    if (!barber || !barber.active) {
      throw new Error("Barbeiro não encontrado");
    }

    return barber;
  }

  async update(id: string, data: any) {
    const barber = await this.repo.findById(id);

    // 🔥 não permite mexer em barbeiro inativo
    if (!barber || !barber.active) {
      throw new Error("Barbeiro não encontrado");
    }

    if (data.name !== undefined) barber.name = data.name;
    if (data.active !== undefined) barber.active = data.active;

    return this.repo.update(barber);
  }

  async delete(id: string) {
    const barber = await this.repo.findById(id);

    if (!barber || !barber.active) {
      throw new Error("Barbeiro não encontrado");
    }

    // 🔥 soft delete
    barber.active = false;

    return this.repo.update(barber);
  }
}