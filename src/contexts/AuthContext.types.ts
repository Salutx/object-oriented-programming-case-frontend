export interface AuthContextProps {
  userSession?: string | null;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}
