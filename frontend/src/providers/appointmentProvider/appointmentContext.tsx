import { createContext } from "react";

import type {
  IAppointmentContext,
} from "./@types";

export const AppointmentContext =
  createContext(
    {} as IAppointmentContext
  );