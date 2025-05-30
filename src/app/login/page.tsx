'use client'

import LoginContainer from "@/containers/Login";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const { push } = useRouter();
  const { userSession } = useAuthContext();

  useEffect(() => {
    if (!!userSession) {
      push("/catalogo");
    }
  }, [push, userSession]);

  return <LoginContainer />;
};

export default Login;
