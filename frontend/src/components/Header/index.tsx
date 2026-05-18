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
        <a href="#services" style={linkStyle}>
          Serviços
        </a>

        <a href="#barbers" style={linkStyle}>
          Barbeiros
        </a>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          style={whatsStyle}
        >
          WhatsApp
        </a>

        {/* 🔐 AUTH BUTTON */}
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

/* styles */
const linkStyle: React.CSSProperties = {
  color: "#aaa",
  textDecoration: "none",
  fontSize: "14px",
};

const whatsStyle: React.CSSProperties = {
  background: "#25D366",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 500,
};

const loginBtn: React.CSSProperties = {
  background: "#c8a24a",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
};

const logoutBtn: React.CSSProperties = {
  background: "#ff4d4d",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
  color: "#fff",
};