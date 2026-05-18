import bcrypt from "bcryptjs";
import { User } from "../models/User";

export class UserService {
  async create(data: any) {
    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const usersCount = await User.countDocuments();

    const role = usersCount === 0 ? "admin" : "user";

    const user = await User.create({
      ...data,
      password: hashedPassword,
      role,
    });

    return user;
  }

  async findAll() {
    return User.find().select("-password");
  }

  async findById(id: string) {
    return User.findById(id).select("-password");
  }
}