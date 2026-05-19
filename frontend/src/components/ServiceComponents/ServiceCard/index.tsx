import { Scissors } from "lucide-react";

interface Service {
  name: string;
  price: number;
  duration: number;
}

interface ServiceCardProps {
  service: Service;
  onSelect?: () => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <div
      onClick={onSelect}
      style={{
        background: "linear-gradient(180deg, #171717 0%, #101010 100%)",

        border: "1px solid rgba(200,162,74,0.25)",

        borderRadius: "18px",

        padding: "22px",

        color: "#f5f5f5",

        cursor: "pointer",

        transition: "0.25s ease",

        width: "100%",
        maxWidth: "280px",
        height: "270px",

        position: "relative",

        overflow: "hidden",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        textAlign: "center",

        boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";

        e.currentTarget.style.borderColor = "#c8a24a";

        e.currentTarget.style.boxShadow = "0 15px 35px rgba(200,162,74,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";

        e.currentTarget.style.borderColor = "rgba(200,162,74,0.25)";

        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35)";
      }}
    >
      {/* GLOW */}
      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          background: "rgba(200,162,74,0.08)",
          borderRadius: "50%",
          top: "-70px",
          right: "-70px",
          filter: "blur(20px)",
        }}
      />

      {/* ICON */}
      <div
        style={{
          width: "64px",
          height: "64px",

          borderRadius: "18px",

          background: "linear-gradient(135deg, #c8a24a 0%, #8b6b24 100%)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          marginBottom: "16px",

          boxShadow: "0 8px 18px rgba(200,162,74,0.22)",

          flexShrink: 0,
        }}
      >
        <Scissors size={26} color="#111" strokeWidth={2.4} />
      </div>

      {/* NAME */}
      <h3
        style={{
          margin: 0,

          fontSize: "22px",

          fontWeight: 700,

          marginBottom: "12px",

          color: "#fff",

          maxWidth: "100%",
        }}
      >
        {service.name}
      </h3>

      {/* DESCRIPTION */}
      <p
        style={{
          margin: 0,
          marginBottom: "18px",

          color: "rgba(255,255,255,0.65)",

          fontSize: "14px",

          lineHeight: 1.5,
        }}
      >
        Atendimento premium com acabamento profissional e máxima qualidade.
      </p>

      {/* FOOTER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",

          background: "rgba(255,255,255,0.04)",

          border: "1px solid rgba(255,255,255,0.06)",

          padding: "10px 14px",

          borderRadius: "999px",
        }}
      >
        <span
          style={{
            color: "#c8a24a",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          R$ {service.price}
        </span>

        <span
          style={{
            color: "rgba(255,255,255,0.4)",
          }}
        >
          •
        </span>

        <span
          style={{
            color: "#ddd",
            fontSize: "14px",
          }}
        >
          {service.duration} min
        </span>
      </div>
    </div>
  );
}
