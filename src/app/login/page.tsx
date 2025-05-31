"use client";

import LoginContainer from "@/containers/Login";
import { useUserSessionQuery } from "@/hooks/useUserSession";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const Login = () => {
  const { replace } = useRouter();
  const { data: userSession, isLoading } = useUserSessionQuery();

  const handleCheckIfUserCanLogin = useCallback(async () => {
    if (isLoading) return;

    const session = userSession;

    if (!session) {
      return;
    }

    const parsedSession = JSON.parse(session);

    if (!!parsedSession) {
      replace("/catalogo");
    }
  }, [isLoading, replace, userSession]);

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

  return <LoginContainer />;
};

export default Login;
