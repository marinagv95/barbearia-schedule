import type { ReactNode } from "react";

import type {
  CreateBarberFormData,
} from "../../validators/barber.schema";

export interface IBarber {
  _id: string;
  name: string;
  active: boolean;
}

export interface IUpdateBarber {
  name?: string;
  active?: boolean;
}

export interface IBarberContext {
  loading: boolean;

  barbers: IBarber[];

  getBarbers: () => Promise<void>;

  createBarber: (
    formData: CreateBarberFormData
  ) => Promise<void>;

  updateBarber: (
    barberId: string,
    formData: IUpdateBarber
  ) => Promise<void>;

  deleteBarber: (
    barberId: string
  ) => Promise<void>;
}

export interface IDefaultProviderProps {
  children: ReactNode;
}