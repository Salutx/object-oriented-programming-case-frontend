import { UserSession } from "@/types/Users.types";

export interface AuthContextProps {
  userSession?: UserSession | null;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}
