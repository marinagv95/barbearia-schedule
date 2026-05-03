import { Router } from "express";
import { ServiceController } from "../controllers/ServiceController";

const router = Router();
const controller = new ServiceController();

// =========================
// 💈 SERVICE ROUTES
// =========================

// CREATE
router.post("/", (req, res) => controller.create(req, res));

// LIST ALL
router.get("/", (req, res) => controller.list(req, res));

// GET BY ID
router.get("/:id", (req, res) => controller.getById(req, res));

// UPDATE
router.put("/:id", (req, res) => controller.update(req, res));

// DELETE (soft delete)
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;