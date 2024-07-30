import {
  TLoginResponse,
  TLogoutResponse,
  TUserCredential,
  TUserRegisterRequest,
  TUserRegisterResponse,
} from "@/types/universal";
import instance from "./base-api";

export const userLogin = async (data: TUserCredential) => {
  const response = instance.post<TLoginResponse>("/api/login", data);

  return response;
};

export const userLogout = () => {
  const response = instance.post<TLogoutResponse>("/api/logout");

  return response;
};

export const userRegister = (data: TUserRegisterRequest) => {
  const response = instance.post<TUserRegisterResponse>("/api/register", data);

  return response;
};
