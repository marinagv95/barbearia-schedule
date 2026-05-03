import { Request, Response } from "express";
import { ServiceRepository } from "../repositories/ServiceRepository";
import { safeId } from "../utils/safeId";

const repo = new ServiceRepository();

export class ServiceController {

  // =========================
  // CREATE
  // =========================
  async create(req: Request, res: Response) {
    try {
      const { name, price, duration } = req.body;

      if (!name || !price || !duration) {
        return res.status(400).json({
          message: "name, price e duration são obrigatórios",
        });
      }

      const service = await repo.create({
        name,
        price,
        duration,
        active: true,
      });

      return res.status(201).json(service);

    } catch (err: any) {
      return res.status(400).json({
        message: "Erro ao criar serviço",
        error: err.message,
      });
    }
  }

  // =========================
  // LIST ALL
  // =========================
  async list(req: Request, res: Response) {
    const services = await repo.findAll();

    return res.json(services);
  }

  // =========================
  // GET BY ID
  // =========================
  async getById(req: Request, res: Response) {
    const id = safeId(req.params.id);

    const service = await repo.findById(id);

    if (!service) {
      return res.status(404).json({
        message: "Serviço não encontrado",
      });
    }

    return res.json(service);
  }

  // =========================
  // UPDATE
  // =========================
  async update(req: Request, res: Response) {
    try {
      const id = safeId(req.params.id);
      const { name, price, duration, active } = req.body;

      const service = await repo.update(id, {
        name,
        price,
        duration,
        active,
      });

      if (!service) {
        return res.status(404).json({
          message: "Serviço não encontrado",
        });
      }

      return res.json(service);

    } catch (err: any) {
      return res.status(400).json({
        message: "Erro ao atualizar serviço",
        error: err.message,
      });
    }
  }

  // =========================
  // DELETE (soft delete)
  // =========================
  async delete(req: Request, res: Response) {
    const id = safeId(req.params.id);

    const service = await repo.delete(id);

    if (!service) {
      return res.status(404).json({
        message: "Serviço não encontrado",
      });
    }

    return res.json({
      message: "Serviço desativado com sucesso",
    });
  }
}