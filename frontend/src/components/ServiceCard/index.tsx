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
        background: "#111",
        border: "1px solid #222",
        borderRadius: "12px",
        padding: "14px",
        color: "#f5f5f5",
        cursor: "pointer",
        transition: "0.2s ease",
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
        {service.name}
      </h3>

      {/* PRICE + DURATION */}
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "#c8a24a",
          fontWeight: 500,
        }}
      >
        R$ {service.price} • {service.duration} min
      </p>
    </div>
  );
}