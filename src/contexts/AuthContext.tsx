"use client";

import { createContext, useCallback, useEffect } from "react";
import {
  AuthContextProps,
  AuthContextProviderProps,
} from "./AuthContext.types";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserSessionQuery } from "@/hooks/useUserSession";

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { replace } = useRouter();
  const { data: userSession, isLoading } = useUserSessionQuery();

  const handleCheckIfUserCanLogin = useCallback(async () => {
    const session = userSession;

    if (!session) {
      return;
    }

    const parsedSession = JSON.parse(session);

    if (!!parsedSession) {
      replace("/catalogo");
    }
  }, [replace, userSession]);

  useEffect(() => {
    handleCheckIfUserCanLogin();
  }, [handleCheckIfUserCanLogin]);

  if (isLoading) {
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
