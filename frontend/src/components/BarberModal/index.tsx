import {
  useContext,
  useState,
} from "react";

import type { IBarber } from "../../providers/barberProviders/@types";

import { BarberContext } from "../../providers/barberProviders/barberContext";

interface BarberModalProps {
  barber: IBarber;

  onClose: () => void;
}

export function BarberModal({
  barber,
  onClose,
}: BarberModalProps) {

  const {
    deleteBarber,
    updateBarber,
  } = useContext(BarberContext);

  const [name, setName] =
    useState(barber.name);

  return (
    <div>
      <div>

        <input
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <p>
          Status:
          {barber.active
            ? " Ativo"
            : " Inativo"}
        </p>

        <button
          type="button"
          onClick={async () => {
            await updateBarber(
              barber._id,
              {
                name,
              }
            );

            onClose();
          }}
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={async () => {
            await deleteBarber(
              barber._id
            );

            onClose();
          }}
        >
          Deletar
        </button>

        <button
          type="button"
          onClick={onClose}
        >
          Fechar
        </button>

      </div>
    </div>
  );
}