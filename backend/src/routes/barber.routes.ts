import { Router } from "express";
import { BarberController } from "../controllers/BarberController";

const router = Router();
const controller = new BarberController();

// 🔹 CRUD Barbeiro
router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;