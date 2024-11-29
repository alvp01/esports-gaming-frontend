import { AxiosResponse } from "axios";
import esportsApiClient from "../api/esportsApiClient";
import { LoginRequest, LoginResponse } from "../types/types";

const logIn = async (body: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
  const response = await esportsApiClient.post<LoginResponse>('/users/sign_in', body);
  return response;
}

const logOut = async () => {
  const response = await esportsApiClient.delete('/users/sign_out');
  return response;
}

export const sessionServices = {
  logIn,
  logOut
}