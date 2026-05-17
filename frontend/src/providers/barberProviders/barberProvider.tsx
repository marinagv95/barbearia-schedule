import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { api } from "../../services/api";

import { BarberContext } from "./barberContext";

import type { IBarber, IUpdateBarber, IDefaultProviderProps } from "./@types";

import type { CreateBarberFormData } from "../../validators/barber.schema";

export const BarberProvider = ({ children }: IDefaultProviderProps) => {
  const [loading, setLoading] = useState(false);

  const [barbers, setBarbers] = useState<IBarber[]>([]);

  const getBarbers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/barbers");

      setBarbers(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao buscar barbeiros");
    } finally {
      setLoading(false);
    }
  };

  const createBarber = async (formData: CreateBarberFormData) => {
    try {
      setLoading(true);

      const response = await api.post("/barbers", formData);

      setBarbers((prevState) => [...prevState, response.data]);

      toast.success("Barbeiro criado com sucesso");
    } catch (error) {
      console.log(error);

      toast.error("Erro ao criar barbeiro");
    } finally {
      setLoading(false);
    }
  };

  const updateBarber = async (barberId: string, formData: IUpdateBarber) => {
    try {
      setLoading(true);

      const response = await api.put(`/barbers/${barberId}`, formData);

      setBarbers((prevState) =>
        prevState.map((barber) =>
          barber._id === barberId ? response.data : barber,
        ),
      );

      toast.success("Barbeiro atualizado");
    } catch (error) {
      console.log(error);

      toast.error("Erro ao atualizar barbeiro");
    } finally {
      setLoading(false);
    }
  };

  const deleteBarber = async (barberId: string) => {
    try {
      setLoading(true);

      await api.delete(`/barbers/${barberId}`);

      setBarbers((prevState) =>
        prevState.filter((barber) => barber._id !== barberId),
      );

      toast.success("Barbeiro deletado");
    } catch (error) {
      console.log(error);

      toast.error("Erro ao deletar barbeiro");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await getBarbers();
    };

    void loadData();
  }, []);

  return (
    <BarberContext.Provider
      value={{
        loading,
        barbers,
        getBarbers,
        createBarber,
        updateBarber,
        deleteBarber,
      }}
    >
      {children}
    </BarberContext.Provider>
  );
};
