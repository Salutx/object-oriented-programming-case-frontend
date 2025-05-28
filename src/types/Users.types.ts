export interface User {
  userId: number;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface UserPayload {
  name: string;
  email: string;
  password: string;
  username: string;
}
