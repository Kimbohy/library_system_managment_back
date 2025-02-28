import { Tokens } from './tokens.type';

export interface AuthResponse {
  tokens: Tokens;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: {
      id: string;
      roleName: string;
    };
    avatar: string | null;
  };
}
