import { createContext } from "react";

import type { IBarberContext } from "./@types";

export const BarberContext =
  createContext({} as IBarberContext);