"use client";

import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WrappedComponentParam = (props: any) => ReactElement | null;

const ProtectedRoute = (WrappedComponent: WrappedComponentParam) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props: any) => {
    const { userSession } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!userSession) {
        router.push("/login");
      }
    }, [userSession, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default ProtectedRoute;
