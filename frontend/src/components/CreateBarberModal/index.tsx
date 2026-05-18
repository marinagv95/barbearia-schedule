import {
  useContext,
  useState,
} from "react";

import { BarberContext } from "../../providers/barberProviders/barberContext";

interface CreateBarberModalProps {
  onClose: () => void;
}

export function CreateBarberModal({
  onClose,
}: CreateBarberModalProps) {

  const {
    createBarber,
  } = useContext(BarberContext);

  const [name, setName] =
    useState("");

  return (
    <div>
      <div>

        <h2>
          Criar barbeiro
        </h2>

        <input
          type="text"
          placeholder="Nome do barbeiro"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <button
          type="button"
          onClick={async () => {
            await createBarber({
              name,
            });

            onClose();
          }}
        >
          Criar
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