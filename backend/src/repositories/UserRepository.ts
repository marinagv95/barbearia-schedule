import { User } from "../models/User";

export class UserRepository {
  async create(data: any) {
    return User.create(data);
  }

  async findAll() {
    return User.find();
  }

  async findById(id: string) {
    return User.findById(id);
  }
}