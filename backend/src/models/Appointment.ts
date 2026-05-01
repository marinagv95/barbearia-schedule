import mongoose from "mongoose";

export interface IAppointment {
  clientName: string;
  phone: string;
  service: string;
  scheduledAt: Date;
  status: "pending" | "confirmed" | "canceled" | "done";
  price?: number;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>(
  {
    clientName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
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