import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return authContext;
};

export default useAuthContext;
