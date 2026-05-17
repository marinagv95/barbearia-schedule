import { useContext } from "react";

import { BarberContext } from "../../providers/barberProviders/barberContext";

import type { IBarber } from "../../providers/barberProviders/@types";

interface BarberCardProps {
  barber: IBarber;
}

export function BarberCard({
  barber,
}: BarberCardProps) {
  const { deleteBarber } =
    useContext(BarberContext);

  return (
    <div>
      <h3>{barber.name}</h3>

      <p>
        Status:
        {barber.active
          ? " Ativo"
          : " Inativo"}
      </p>

      <button
        onClick={() =>
          deleteBarber(barber._id)
        }
      >
        Deletar
      </button>
    </div>
  );
}