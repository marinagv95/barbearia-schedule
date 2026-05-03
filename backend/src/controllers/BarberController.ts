import { Request, Response } from "express";
import { BarberService } from "../services/BarberService";

const service = new BarberService();

type IdRequest = Request<{ id: string }>;

export class BarberController {

  // CREATE
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const barber = await service.create(name);

      return res.status(201).json(barber);

    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  // LIST
  async list(req: Request, res: Response) {
    const barbers = await service.list();

    return res.json(barbers);
  }

  // GET BY ID
  async getById(req: IdRequest, res: Response) {
    try {
      const barber = await service.getById(req.params.id);

      return res.json(barber);

    } catch (err: any) {
      return res.status(404).json({
        message: err.message,
      });
    }
  }

  // UPDATE
  async update(req: IdRequest, res: Response) {
    try {
      const barber = await service.update(req.params.id, req.body);

      return res.json(barber);

    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  // DELETE (soft delete)
  async delete(req: IdRequest, res: Response) {
    try {
      await service.delete(req.params.id);

      return res.json({
        message: "Barbeiro desativado com sucesso",
      });

    } catch (err: any) {
      return res.status(404).json({
        message: err.message,
      });
    }
  }
}