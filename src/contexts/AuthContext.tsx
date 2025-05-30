"use client";

import { createContext, useEffect, useState } from "react";
import {
  AuthContextProps,
  AuthContextProviderProps,
} from "./AuthContext.types";
import { UserSession } from "@/types/Users.types";
import { CircularProgress } from "@mui/material";

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedSession = localStorage.getItem("userSession");
    if (storedSession) {
      setUserSession(JSON.parse(storedSession));
    }
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        style={{
          gap: 12,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#5A62E6",
        }}
      >
        <CircularProgress size={32} color="inherit" />
        <span
          style={{
            fontFamily: "Inter",
            fontSize: "14px",
            color: "#010023",
          }}
        >
          Aguarde! Carregando...
        </span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ userSession }}>
      {children}
    </AuthContext.Provider>
  );
};
