export interface User {
  userId: number;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface UserRegisterPayload {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface UserLoginPayload {
  username: string;
  password: string;
}

export interface UserSession {
  userId: number;
  name: string;
  username: string;
  email: string;
}
