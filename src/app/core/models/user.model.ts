export interface User {
  id: number;
  email: string;
  password: string;
  admin: boolean;
  name?: string;
}
