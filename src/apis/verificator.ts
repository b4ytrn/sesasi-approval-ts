import { TPermitionsDataResponse, TUsersDataResponse } from "@/types/universal";
import instance from "./base-api";
import {
  TVericatorVefyUserRequest,
  TVericatorVerifyUserResponse,
  TVerificatorResponsePermitionRequest,
  TVerificatorResponsePermitionResponse,
} from "@/types/verificator";

export const verificatorGetUsersData = () => {
  const response = instance.get<TUsersDataResponse>("/api/read-user");
  return response;
};

export const verificatorVerifyUser = (data: TVericatorVefyUserRequest) => {
  const response = instance.put<TVericatorVerifyUserResponse>(
    `/api/verify-user/${data.id}`
  );
  return response;
};

export const verificatorGetPermitionsData = () => {
  const response = instance.get<TPermitionsDataResponse>(
    "/api/read-permittion"
  );
  return response;
};

export const verificatorResponsePermition = (
  data: TVerificatorResponsePermitionRequest
) => {
  const response = instance.post<TVerificatorResponsePermitionResponse>(
    "/api/accept-permittion",
    data
  );
  return response;
};
