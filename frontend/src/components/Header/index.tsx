import { useContext } from "react";
import logo from "../../assets/logoBF.png";

import { AuthContext } from "../../providers/auth/AuthContext";

export function Header() {
  const { user, logout, setLoginModalOpen } =
    useContext(AuthContext);

  return (
    <header
      style={{
        background: "#0f0f0f",

        border:
          "1px solid rgba(255,255,255,0.05)",

        borderRadius: "18px",

        padding: "14px 22px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        color: "#f5f5f5",

        marginBottom: "24px",

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.25)",

        position: "sticky",

        top: "12px",

        zIndex: 100,
      }}
    >
      {/* BRAND */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img
          src={logo}
          alt="BarberFlow"
          style={{
            width: "52px",
            height: "52px",

            borderRadius: "50%",

            objectFit: "cover",

            border:
              "1px solid rgba(200,162,74,0.25)",

            boxShadow:
              "0 0 20px rgba(200,162,74,0.18)",
          }}
        />

        <div>
          <span
            style={{
              fontSize: "18px",

              fontWeight: 700,

              letterSpacing: "1px",

              color: "#fff",

              display: "block",
            }}
          >
            BarberFlow
          </span>

          <span
            style={{
              fontSize: "12px",

              color:
                "rgba(255,255,255,0.45)",
            }}
          >
            Premium Experience
          </span>
        </div>
      </div>

      {/* NAV */}
      <nav
        style={{
          display: "flex",
          gap: "14px",
          alignItems: "center",
        }}
      >
        <a href="#services" style={linkStyle}>
          Serviços
        </a>

        <a href="#barbers" style={linkStyle}>
          Barbeiros
        </a>

        {/* NOVO SOBRE */}
        <a href="#about" style={linkStyle}>
          Sobre
        </a>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          style={whatsStyle}
        >
          WhatsApp
        </a>

        {/* AUTH */}
        {!user ? (
          <button
            onClick={() => setLoginModalOpen(true)}
            style={loginBtn}
          >
            Entrar
          </button>
        ) : (
          <button
            onClick={logout}
            style={logoutBtn}
          >
            Sair
          </button>
        )}
      </nav>
    </header>
  );
}

/* STYLES */

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.72)",

  textDecoration: "none",

  fontSize: "14px",

  fontWeight: 500,

  transition: "0.2s ease",
};

const whatsStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, #25D366 0%, #1faa52 100%)",

  color: "#fff",

  padding: "8px 14px",

  borderRadius: "10px",

  textDecoration: "none",

  fontSize: "13px",

  fontWeight: 700,

  border: "none",

  boxShadow:
    "0 6px 18px rgba(37,211,102,0.22)",
};

const loginBtn: React.CSSProperties = {
  background:
    "linear-gradient(135deg, #c8a24a 0%, #8b6b24 100%)",

  border: "none",

  padding: "8px 16px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: 700,

  color: "#111",

  boxShadow:
    "0 6px 18px rgba(200,162,74,0.18)",
};

const logoutBtn: React.CSSProperties = {
  background:
    "linear-gradient(135deg, #ff4d4d 0%, #d93636 100%)",

  border: "none",

  padding: "8px 16px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: 700,

  color: "#fff",

  boxShadow:
    "0 6px 18px rgba(255,77,77,0.18)",
};