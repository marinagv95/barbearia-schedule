import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";

const router = Router();
const controller = new AppointmentController();

router.get("/available-slots", (req, res) =>
  controller.getAvailableSlots(req, res)
);
router.post("/", (req, res) => controller.create(req, res));
router.get("/", (req, res) => controller.list(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
router.patch("/:id/status", (req, res) => controller.updateStatus(req, res));
router.patch("/:id/reschedule", (req, res) => controller.reschedule(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;