import mongoose from "mongoose";

export interface IAppointment {
  userId: mongoose.Types.ObjectId;
  barberId: mongoose.Types.ObjectId; // 🔥 NOVO

  service: string;
  scheduledAt: Date;

  status: "pending" | "confirmed" | "canceled" | "done";

  price?: number;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    barberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barber",
      required: true, // 🔥 obrigatório agora
    },

    service: {
      type: String,
      required: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled", "done"],
      default: "pending",
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);