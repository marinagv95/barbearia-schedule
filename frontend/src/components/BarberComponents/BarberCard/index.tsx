import { Crown } from "lucide-react";

import type { IBarber } from "../../../providers/barberProviders/@types";

interface BarberCardProps {
  barber: IBarber;
  onClick: () => void;
}

export function BarberCard({
  barber,
  onClick,
}: BarberCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background:
          "linear-gradient(145deg, #141414 0%, #0b0b0b 100%)",

        border: "1px solid rgba(255,255,255,0.06)",

        borderRadius: "22px",

        padding: "24px",

        width: "100%",
        maxWidth: "280px",
        minHeight: "240px",

        position: "relative",

        overflow: "hidden",

        cursor: "pointer",

        transition: "all 0.25s ease",

        boxShadow:
          "0 12px 30px rgba(0,0,0,0.35)",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        textAlign: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px)";

        e.currentTarget.style.borderColor =
          "rgba(200,162,74,0.4)";

        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";

        e.currentTarget.style.borderColor =
          "rgba(255,255,255,0.06)";

        e.currentTarget.style.boxShadow =
          "0 12px 30px rgba(0,0,0,0.35)";
      }}
    >
      {/* GOLD LINE */}
      <div
        style={{
          position: "absolute",

          top: 0,
          left: 0,

          width: "100%",
          height: "4px",

          background:
            "linear-gradient(90deg, #c8a24a, #8b6b24)",
        }}
      />

      {/* ICON */}
      <div
        style={{
          width: "90px",
          height: "90px",

          borderRadius: "24px",

          background:
            "linear-gradient(135deg, rgba(200,162,74,0.18), rgba(200,162,74,0.04))",

          border:
            "1px solid rgba(200,162,74,0.25)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          marginBottom: "22px",
        }}
      >
        <Crown size={38} color="#c8a24a" />
      </div>

      {/* NAME */}
      <h3
        style={{
          color: "#fff",

          fontSize: "24px",

          fontWeight: 700,

          margin: 0,

          marginBottom: "22px",
        }}
      >
        {barber.name}
      </h3>

      {/* STATUS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",

          background: barber.active
            ? "rgba(76,175,80,0.12)"
            : "rgba(255,77,77,0.12)",

          border: barber.active
            ? "1px solid rgba(76,175,80,0.18)"
            : "1px solid rgba(255,77,77,0.18)",

          padding: "10px 16px",

          borderRadius: "999px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",

            borderRadius: "50%",

            background: barber.active
              ? "#4caf50"
              : "#ff4d4d",

            boxShadow: barber.active
              ? "0 0 10px #4caf50"
              : "0 0 10px #ff4d4d",
          }}
        />

        <span
          style={{
            color: barber.active
              ? "#7dff84"
              : "#ff8a8a",

            fontSize: "14px",

            fontWeight: 600,
          }}
        >
          {barber.active
            ? "Disponível"
            : "Indisponível"}
        </span>
      </div>
    </div>
  );
}