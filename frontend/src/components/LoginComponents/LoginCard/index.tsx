import { useState, useContext } from "react";
import { AuthContext } from "../../../providers/auth/AuthContext";

export function LoginCard() {
  const { login, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await login({
      email,
      password,
    });
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 380,
        padding: 24,
        borderRadius: 12,
        background: "#111",
        color: "#fff",
        margin: "0 auto",
      }}
    >
      <h2 style={{ marginBottom: 16 }}>Entrar</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #333",
  background: "#000",
  color: "#fff",
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "none",
  background: "#c8a24a",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
};
