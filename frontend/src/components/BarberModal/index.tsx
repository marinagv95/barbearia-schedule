import { useContext, useState } from "react";

import type { IBarber } from "../../providers/barberProviders/@types";
import { BarberContext } from "../../providers/barberProviders/barberContext";

interface BarberModalProps {
  barber: IBarber;
  onClose: () => void;
}

export function BarberModal({ barber, onClose }: BarberModalProps) {
  const { deleteBarber, updateBarber } = useContext(BarberContext);

  const [name, setName] = useState(barber.name);
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#111",
          border: "1px solid #222",
          borderRadius: "14px",
          padding: "24px",
          width: "400px",
          color: "#f5f5f5",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* TITLE */}
        <h2 style={{ marginBottom: "16px" }}>Editar Barbeiro</h2>

        {/* INPUT */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "#fff",
            marginBottom: "12px",
            outline: "none",
          }}
        />

        {/* STATUS */}
        <p
          style={{
            marginBottom: "20px",
            fontSize: "14px",
            color: barber.active ? "#4caf50" : "#ff4d4d",
          }}
        >
          Status: {barber.active ? "● Ativo" : "● Inativo"}
        </p>

        {/* ACTIONS */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: "#c8a24a",
              color: "#000",
              fontWeight: "bold",
            }}
            disabled={loading}
            onClick={async () => {
              setLoading(true);

              await updateBarber(barber._id, { name });

              setLoading(false);
              onClose();
            }}
          >
            Salvar
          </button>

          <button
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: "#ff4d4d",
              color: "#fff",
              fontWeight: "bold",
            }}
            disabled={loading}
            onClick={async () => {
              setLoading(true);

              await deleteBarber(barber._id);

              setLoading(false);
              onClose();
            }}
          >
            Deletar
          </button>
        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "transparent",
            color: "#aaa",
            cursor: "pointer",
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}