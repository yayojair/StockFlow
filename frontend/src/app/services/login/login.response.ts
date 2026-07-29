export interface AuthLoginUser {
  token: string;
  user: {
      id: number;
      name: string;
      email: string
  }
}

export interface LoginResponse{
    statusCode: number;
    user: AuthLoginUser;
}