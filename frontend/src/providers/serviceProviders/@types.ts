import type { ReactNode } from "react";
import type { CreateServiceFormData } from "../../validators/service.schema";

export interface IService {
  _id: string;
  name: string;
  price: number;
  duration: number;
}

export interface IUpdateService {
  name?: string;
  price?: number;
  duration?: number;
}

export interface IServiceContext {
  loading: boolean;

  services: IService[];

  getServices: () => Promise<void>;

  createService: (formData: CreateServiceFormData) => Promise<void>;

  updateService: (
    serviceId: string,
    formData: IUpdateService
  ) => Promise<void>;

  deleteService: (serviceId: string) => Promise<void>;
}

export interface IServiceProviderProps {
  children: ReactNode;
}