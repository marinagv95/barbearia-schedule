import { useContext } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { BarberContext } from "../../providers/barberProviders/barberContext";

import { BarberCard } from "../../components/BarberCard";

import {
  createBarberSchema,
  type CreateBarberFormData,
} from "../../validators/barber.schema";

export default function Barbers() {
  const {
    barbers,
    createBarber,
    loading,
  } = useContext(BarberContext);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<CreateBarberFormData>({
    resolver: zodResolver(
      createBarberSchema
    ),
  });

  const handleCreateBarber =
    async (
      formData: CreateBarberFormData
    ) => {
      await createBarber(formData);

      reset();
    };

  return (
    <div>
      <h1>Barbeiros</h1>

      <form
        onSubmit={handleSubmit(
          handleCreateBarber
        )}
      >
        <input
          type="text"
          placeholder="Nome do barbeiro"
          {...register("name")}
        />

        {errors.name && (
          <p>{errors.name.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Criando..."
            : "Criar barbeiro"}
        </button>
      </form>

      <div>
        {barbers.map((barber) => (
          <BarberCard
            key={barber._id}
            barber={barber}
          />
        ))}
      </div>
    </div>
  );
}