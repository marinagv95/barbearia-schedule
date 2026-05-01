import express from "express";
import cors from "cors";
import appointmentRoutes from "./routes/appointment.routes";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Health check (API status)
app.get("/", (req, res) => {
  res.json({ message: "API rodando 🚀" });
});

// Rotas da aplicação
app.use("/appointments", appointmentRoutes);

export default app;