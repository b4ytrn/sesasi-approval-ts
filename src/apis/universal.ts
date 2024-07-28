import {
  TLoginResponse,
  TLogoutResponse,
  TUserCredential,
} from "@/types/universal";
import instance from "./base-api";

// const headers = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("bearer")}` },
// };

export const userLogin = async (data: TUserCredential) => {
  const response = instance.post<TLoginResponse>("/api/login", data);

  return response;
};

export const userLogout = () => {
  const response = instance.post<TLogoutResponse>("/api/logout");

  return response;
};
