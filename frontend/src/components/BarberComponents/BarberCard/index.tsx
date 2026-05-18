import type { IBarber } from "../../../providers/barberProviders/@types";

interface BarberCardProps {
  barber: IBarber;
  onClick: () => void;
}

export function BarberCard({ barber, onClick }: BarberCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "12px",
        padding: "12px",
        color: "#f5f5f5",
        cursor: "pointer",
        transition: "0.2s ease",

        /* 🔥 CONTROLE DE TAMANHO */
        width: "100%",
        maxWidth: "220px",
        minHeight: "90px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
        e.currentTarget.style.borderColor = "#c8a24a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#222";
      }}
    >
      {/* NAME */}
      <h3
        style={{
          margin: 0,
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "6px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {barber.name}
      </h3>

      {/* STATUS */}
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: barber.active ? "#4caf50" : "#ff4d4d",
        }}
      >
        {barber.active ? "● Ativo" : "● Inativo"}
      </p>
    </div>
  );
}