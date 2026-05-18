import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { api } from "../../services/api";
import { ServiceContext } from "./serviceContext";

import type {
  IService,
  IUpdateService,
  IServiceProviderProps,
} from "./@types";

import type { CreateServiceFormData } from "../../validators/service.schema";

export const ServiceProvider = ({ children }: IServiceProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<IService[]>([]);

  const getServices = async () => {
    try {
      setLoading(true);

      const response = await api.get("/services");

      setServices(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao buscar serviços");
    } finally {
      setLoading(false);
    }
  };

  const createService = async (formData: CreateServiceFormData) => {
    try {
      setLoading(true);

      const response = await api.post("/services", formData);

      setServices((prev) => [...prev, response.data]);

      toast.success("Serviço criado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar serviço");
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (
    serviceId: string,
    formData: IUpdateService
  ) => {
    try {
      setLoading(true);

      const response = await api.put(`/services/${serviceId}`, formData);

      setServices((prev) =>
        prev.map((service) =>
          service._id === serviceId ? response.data : service
        )
      );

      toast.success("Serviço atualizado");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar serviço");
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      setLoading(true);

      await api.delete(`/services/${serviceId}`);

      setServices((prev) =>
        prev.filter((service) => service._id !== serviceId)
      );

      toast.success("Serviço deletado");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar serviço");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const loadData = async () => {
    await getServices();
  };

  void loadData();
}, []);

  return (
    <ServiceContext.Provider
      value={{
        loading,
        services,
        getServices,
        createService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};