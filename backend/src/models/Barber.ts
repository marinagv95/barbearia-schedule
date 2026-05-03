import mongoose from "mongoose";

export interface IBarber {
  name: string;
  active: boolean;
}

const BarberSchema = new mongoose.Schema<IBarber>(
  {
    name: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Barber = mongoose.model<IBarber>(
  "Barber",
  BarberSchema
);