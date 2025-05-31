"use client";

import { useUserSessionQuery } from "@/hooks/useUserSession";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WrappedComponentParam = (props: any) => ReactElement | null;

const ProtectedRoute = (WrappedComponent: WrappedComponentParam) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props: any) => {
    const { data: userSession, isLoading } = useUserSessionQuery();
    const router = useRouter();

    useEffect(() => {
      if (isLoading) return;

      if (!userSession) {
        router.push("/login");
      }
    }, [userSession, router, isLoading]);

    if (isLoading)
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

    if (!userSession)
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

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default ProtectedRoute;
