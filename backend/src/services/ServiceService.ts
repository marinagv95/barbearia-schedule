import { ServiceRepository } from "../repositories/ServiceRepository";

export class ServiceService {
  constructor(private repo = new ServiceRepository()) {}

  async listServices() {
    return this.repo.findAll();
  }

  async getByName(name: string) {
    const service = await this.repo.findByName(name);

    if (!service) {
      throw new Error("Serviço não encontrado");
    }

    return service;
  }
}