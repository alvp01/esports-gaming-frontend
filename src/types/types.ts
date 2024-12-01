import { AxiosResponse } from "axios";

// Define the request body type for login
export interface LoginRequest {
  user: {
    email: string;
    password: string;
  };
}

// Define the expected response type for login
export interface LoginResponse {
  token: string;
  user_id: number;
  is_admin: boolean;
  user_email: string;
}

export type LogInFunction = (body: LoginRequest) => Promise<AxiosResponse<LoginResponse>>;

export type LogOutFunction = () => Promise<AxiosResponse>;

export type authUser = {
  userEmail: string;
  isAdmin: boolean;
  userId: number;
}