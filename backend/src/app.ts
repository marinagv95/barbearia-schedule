import express from "express";
import cors from "cors";

import appointmentRoutes from "./routes/appointment.routes";
import barberRoutes from "./routes/barber.routes";
import serviceRoutes from "./routes/service.routes";

import { startWppBot } from "./bot/wppClient";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";


const app = express();

app.use(cors());
app.use(express.json());

// =========================
// HEALTH
// =========================
app.get("/", (req, res) => {
  res.json({ message: "API rodando 🚀" });
});

// =========================
// ROUTES
// =========================
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/barbers", barberRoutes);
app.use("/services", serviceRoutes);
app.use("/appointments", appointmentRoutes);



// =========================
// BOT START
// =========================
startWppBot()
  .then(() => console.log("🤖 WhatsApp bot ativo"))
  .catch((err) => console.error("❌ Erro ao iniciar bot:", err));

export default app;