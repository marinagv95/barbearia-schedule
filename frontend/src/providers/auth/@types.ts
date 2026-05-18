import type { ReactNode } from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthContext {
  user: IUser | null;
  loading: boolean;

  login: (data: ILoginData) => Promise<void>;
  logout: () => void;

  // 🪟 MODAL CONTROL
  loginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAuthProviderProps {
  children: ReactNode;
}