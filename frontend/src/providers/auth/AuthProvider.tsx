import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../../services/api";
import { AuthContext } from "./AuthContext";

import type { IAuthProviderProps, IUser, ILoginData } from "./@types";

export function AuthProvider({ children }: IAuthProviderProps) {
  // 💡 MUDANÇA 1: O estado do usuário já inicia tentando ler o que foi salvo no navegador
  const [user, setUser] = useState<IUser | null>(() => {
    const storageUser = localStorage.getItem("@USER");
    return storageUser ? JSON.parse(storageUser) : null;
  });
  
  // 💡 MUDANÇA 2: O loading inicia como TRUE se houver token E usuário salvos
  const [loading, setLoading] = useState(() => {
    const token = localStorage.getItem("@TOKEN");
    const storageUser = localStorage.getItem("@USER");
    return !!(token && storageUser); 
  });

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  // =========================
  // 🔐 AUTO LOGIN LOCAL (Sem rota /me)
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const storageUser = localStorage.getItem("@USER");

    // Se tiver os dados salvos localmente, restaura a sessão e reconfigura o axios
    if (token && storageUser) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(JSON.parse(storageUser));
    }

    setLoading(false); // Desliga o loading imediatamente
  }, []);

  // =========================
  // 🔐 LOGIN
  // =========================
  const login = async (data: ILoginData) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", data);

      const { token, user: loggedUser } = response.data;

      // 💡 MUDANÇA 3: Além do token, salvamos os dados do usuário em formato de texto (string)
      localStorage.setItem("@TOKEN", token);
      localStorage.setItem("@USER", JSON.stringify(loggedUser)); 

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(loggedUser);
      setLoginModalOpen(false);

      toast.success("Login realizado com sucesso");

      if (loggedUser.role === "admin") {
        navigate("/barbers");
      } else {
        navigate("/");
      }

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
    // 💡 MUDANÇA 4: Remove tudo do localStorage ao deslogar
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USER");

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
        loginModalOpen,
        setLoginModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}