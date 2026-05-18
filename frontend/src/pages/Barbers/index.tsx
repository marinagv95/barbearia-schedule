import {
  useContext,
  useState,
} from "react";

import { BarberContext } from "../../providers/barberProviders/barberContext";

import type { IBarber } from "../../providers/barberProviders/@types";

import { BarberCard } from "../../components/BarberCard";

import { BarberModal } from "../../components/BarberModal";

import { CreateBarberModal } from "../../components/CreateBarberModal";

export default function Barbers() {

  const {
    barbers,
    loading,
  } = useContext(BarberContext);

  const [search, setSearch] =
    useState("");

  const [
    selectedBarber,
    setSelectedBarber,
  ] = useState<IBarber | null>(null);

  const [
    createModal,
    setCreateModal,
  ] = useState(false);

  const filteredBarbers =
    barbers.filter((barber) =>
      barber.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div>

      <h1>Barbeiros</h1>

      <nav>

        <input
          type="text"
          placeholder="Pesquisar barbeiro"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

        <button
          type="button"
          onClick={() =>
            setCreateModal(true)
          }
        >
          Criar barbeiro
        </button>

      </nav>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>

          {filteredBarbers.map(
            (barber) => (
              <BarberCard
                key={barber._id}
                barber={barber}
                onClick={() =>
                  setSelectedBarber(
                    barber
                  )
                }
              />
            )
          )}

        </div>
      )}

      {selectedBarber && (
        <BarberModal
          barber={selectedBarber}
          onClose={() =>
            setSelectedBarber(null)
          }
        />
      )}

      {createModal && (
        <CreateBarberModal
          onClose={() =>
            setCreateModal(false)
          }
        />
      )}

    </div>
  );
}