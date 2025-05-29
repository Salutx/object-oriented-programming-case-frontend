"use client";

import { createContext, useEffect } from "react";
import {
  AuthContextProps,
  AuthContextProviderProps,
} from "./AuthContext.types";
import { useLocalStorage } from "react-use";
import { UserSession } from "@/types/Users.types";
import { usePathname, useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [userSession] = useLocalStorage<UserSession | null>(
    "userSession",
    null
  );

  useEffect(() => {
    if (!!userSession && pathname === "/login") {
      router.push("/catalogo");
      return;
    }

    if (!userSession && pathname !== "/login") {
      router.push("/login");
    }
  }, [userSession, pathname, router]);

  const isOnLoginPage = pathname === "/login";

  if (!userSession && !isOnLoginPage) {
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
