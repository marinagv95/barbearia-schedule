import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admMiddleware";

const router = Router();
const controller = new UserController();

// 🔓 cadastro público (primeiro acesso)
router.post("/", (req, res) => controller.create(req, res));

// 🔒 listar usuários só admin
router.get("/", authMiddleware, adminMiddleware, (req, res) => controller.findAll(req, res));

// 🔒 buscar usuário logado
router.get("/:id", authMiddleware, (req, res) => controller.findById(req, res));

export default router;