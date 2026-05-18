import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    barberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barber",
      required: true,
    },

    // 💡 mantém string por enquanto (compatível com teu fluxo atual)
    service: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 já preparado pra evolução futura (Service model)
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: false,
    },

    duration: {
      type: Number,
      default: 30,
      min: 10,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "done", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", AppointmentSchema);