import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";

const router = Router();

const controller = new AppointmentController();
router.get("/available-slots", controller.getAvailableSlots);

// CREATE
router.post("/", (req, res) => controller.create(req, res));

// LIST ALL
router.get("/", (req, res) => controller.list(req, res));

// GET BY ID
router.get("/:id", (req, res) => controller.getById(req, res));

// UPDATE STATUS
router.patch("/:id/status", (req, res) =>
  controller.updateStatus(req, res)
);

// RESCHEDULE
router.patch("/:id/reschedule", (req, res) =>
  controller.reschedule(req, res)
);

// DELETE
router.delete("/:id", (req, res) => controller.delete(req, res));



export default router;