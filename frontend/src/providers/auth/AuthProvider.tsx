import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../../services/api";
import { AuthContext } from "./AuthContext";

import type { IAuthProviderProps, IUser, ILoginData } from "./@types";

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  // 🪟 modal login
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const navigate = useNavigate();

  // =========================
  // 🔐 AUTO LOGIN (/me)
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    if (!token) return;

    const loadUser = async () => {
      try {
        const response = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;

        setUser(userData);

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      } catch (error) {
        localStorage.removeItem("@TOKEN");
        setUser(null);
      }
    };

    loadUser();
  }, []);

  // =========================
  // 🔐 REDIRECT CENTRALIZADO
  // =========================
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/barbers");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  // =========================
  // 🔐 LOGIN
  // =========================
  const login = async (data: ILoginData) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", data);

      const { token, user } = response.data;

      localStorage.setItem("@TOKEN", token);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(user);

      setLoginModalOpen(false); // fecha modal

      toast.success("Login realizado com sucesso");
    } catch (error) {
      toast.error("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🔐 LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("@TOKEN");

    delete api.defaults.headers.common.Authorization;

    setUser(null);

    navigate("/");

    toast.success("Logout realizado com sucesso");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,

        // 🪟 modal
        loginModalOpen,
        setLoginModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}