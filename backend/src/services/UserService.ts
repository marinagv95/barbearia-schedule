import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private repo = new UserRepository();

  async create(data: any) {
    return this.repo.create(data);
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findById(id: string) {
    return this.repo.findById(id);
  }
}