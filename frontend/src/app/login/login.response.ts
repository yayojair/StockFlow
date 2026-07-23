export interface AuthLoginUser {
  userId: string;
  name: string;
  email: string;
  tokensCSRF: string;
}

export interface LoginResponse{
    statusCode: number;
    user: AuthLoginUser;
}