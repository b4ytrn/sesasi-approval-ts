import {
  TAdminChangeUserLevelRequest,
  TAdminChangeUserLevelResponse,
  TAdminAddVerificatorRequest,
  TAdminUpdatePasswordRequest,
} from "@/types/admin";
import instance from "./base-api";
import { TPermitionsDataResponse, TUsersDataResponse } from "@/types/universal";

export const adminGetUsersData = () => {
  const response = instance.get<TUsersDataResponse>("/api/read-user");
  return response;
};

export const adminChangeUserLevel = (data: TAdminChangeUserLevelRequest) => {
  const response = instance.put<TAdminChangeUserLevelResponse>(
    "/api/promote-verificator",
    data
  );
  return response;
};

export const adminAddVerificator = (data: TAdminAddVerificatorRequest) => {
  const response = instance.post<TAdminChangeUserLevelResponse>(
    "/api/add-verificator",
    data
  );
  return response;
};

export const adminGetPermitionsData = () => {
  const response = instance.get<TPermitionsDataResponse>(
    "/api/read-permittion"
  );
  return response;
};

export const adminUpdatePasswordUser = (data: TAdminUpdatePasswordRequest) => {
  const newPass = {
    password: data.password,
  };
  const response = instance.post<TPermitionsDataResponse>(
    `/api/user-updatepass/${data.id}`,
    newPass
  );
  return response;
};
