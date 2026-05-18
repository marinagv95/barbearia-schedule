import { useContext, useState } from "react";
import { BarberContext } from "../../providers/barberProviders/barberContext";

interface CreateBarberModalProps {
  onClose: () => void;
}

export function CreateBarberModal({ onClose }: CreateBarberModalProps) {
  const { createBarber } = useContext(BarberContext);

  const [name, setName] = useState("");
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
          width: "380px",
          color: "#f5f5f5",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* TITLE */}
        <h2 style={{ marginBottom: "16px" }}>Criar barbeiro</h2>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Nome do barbeiro"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "#fff",
            marginBottom: "16px",
            outline: "none",
          }}
        />

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            disabled={loading}
            onClick={async () => {
              if (!name) return;

              setLoading(true);

              await createBarber({ name });

              setLoading(false);
              onClose();
            }}
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
          >
            Criar
          </button>

          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
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
    </div>
  );
}