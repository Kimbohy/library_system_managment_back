export * from './tokens.type';

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type AuthResponse = {
  tokens: Tokens;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: number;
    avatar: string | null;
  };
};
