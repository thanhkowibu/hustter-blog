import {
  AuthContextProps,
  AuthContextProviderProps,
  AuthUserProps,
  input,
} from "@/types/auth.types";
import { createContext, useEffect, useState } from "react";
import axios from "@/api/axios";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthUserProps | null>(
    JSON.parse(sessionStorage.getItem("user") || "null") || null
  );

  const login = async (input: input) => {
    const res = await axios.post("/auth/login", input, {
      withCredentials: true,
    });
    setUser(res.data);
  };

  const logout = async () => {
    const res = await axios.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
    console.log(res.data);
  };

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, scrollToTop }}>
      {children}
    </AuthContext.Provider>
  );
};
