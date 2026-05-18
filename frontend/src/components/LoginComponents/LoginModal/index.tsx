import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/auth/AuthContext";

export function LoginModal() {
  const { login, loginModalOpen, setLoginModalOpen, loading } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🚫 trava scroll quando abre modal
  useEffect(() => {
    if (loginModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loginModalOpen]);

  if (!loginModalOpen) return null;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await login({ email, password });
    setLoginModalOpen(false);
  }

  return (
    <div
      onClick={() => setLoginModalOpen(false)}
      style={styles.overlay}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={styles.modal}
      >
        <h2 style={{ marginBottom: 20 }}>Entrar</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {loading ? "Entrando..." : "Login"}
          </button>
        </form>

        <button
          onClick={() => setLoginModalOpen(false)}
          style={styles.close}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modal: {
    width: "100%",
    maxWidth: 380,
    background: "#111",
    color: "#fff",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #333",
    background: "#000",
    color: "#fff",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: 10,
    background: "#c8a24a",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10,
  },

  close: {
    width: "100%",
    marginTop: 10,
    background: "transparent",
    border: "none",
    color: "#aaa",
    cursor: "pointer",
  },
};