import { Router } from "express";
import { BarberController } from "../controllers/BarberController";

const router = Router();
const controller = new BarberController();

// 🔹 CRUD Barbeiro
router.post("/barbers", controller.create);
router.get("/barbers", controller.list);
router.get("/barbers/:id", controller.getById);
router.put("/barbers/:id", controller.update);
router.delete("/barbers/:id", controller.delete);

export default router;