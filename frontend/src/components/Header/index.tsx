import logo from "../../assets/logoBF.png";

export function Header() {
  return (
    <header
      style={{
        background: "#0f0f0f",
        borderBottom: "1px solid #222",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#f5f5f5",
      }}
    >
      {/* BRAND */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={logo}
          alt="BarberFlow"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 0 10px rgba(200,162,74,0.3)",
          }}
        />

        <span
          style={{
            fontSize: "16px",
            fontWeight: 600,
            letterSpacing: "1px",
            color: "#fff",
          }}
        >
          BarberFlow
        </span>
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <a
          href="#services"
          style={{
            color: "#aaa",
            textDecoration: "none",
            fontSize: "14px",
            transition: "0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "#c8a24a")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "#aaa")
          }
        >
          Serviços
        </a>

        <a
          href="#barbers"
          style={{
            color: "#aaa",
            textDecoration: "none",
            fontSize: "14px",
            transition: "0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "#c8a24a")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "#aaa")
          }
        >
          Barbeiros
        </a>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          style={{
            background: "#25D366",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}