import { useContext } from "react";
import { AuthContext } from "../../../providers/auth/AuthContext";

export function LogoutButton() {
  const { logout, loading } = useContext(AuthContext);

  return (
    <button
      onClick={logout}
      disabled={loading}
      style={{
        padding: "10px 14px",
        background: "#ff4d4d",
        border: "none",
        borderRadius: 6,
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {loading ? "Saindo..." : "Logout"}
    </button>
  );
}