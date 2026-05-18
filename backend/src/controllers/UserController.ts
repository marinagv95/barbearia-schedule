import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private service = new UserService();

  async create(req: Request, res: Response) {
    const user = await this.service.create(req.body);
    return res.status(201).json(user);
  }

  async findAll(req: Request, res: Response) {
    const users = await this.service.findAll();
    return res.json(users);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    // 🔐 validação segura (resolve o erro do TS)
    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const user = await this.service.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    return res.json(user);
  }
}