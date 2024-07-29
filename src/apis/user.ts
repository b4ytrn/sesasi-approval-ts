import { TPermitionsDataResponse } from "@/types/universal";
import instance from "./base-api";
import {
  TUserAddPermitionRequest,
  TUserAddPermitionResponse,
  TUserCancelPermitionRequest,
  TUserCancelPermitionResponse,
  TUserCheckPermitionRequest,
  TUserCheckPermitionResponse,
  TUserDeletePermitionRequest,
  TUserDeletePermitionResponse,
  TUserEditPermitionRequest,
  TUserResetPasswordRequest,
  TUserResetPasswordResponse,
} from "@/types/user";

export const userGetPermitionsData = () => {
  const response = instance.get<TPermitionsDataResponse>("/api/permittion");
  return response;
};

export const userCancelPermition = (data: TUserCancelPermitionRequest) => {
  const response = instance.post<TUserCancelPermitionResponse>(
    `/api/cancel/${data.id}`
  );
  return response;
};

export const userDeletePermition = (data: TUserDeletePermitionRequest) => {
  const response = instance.delete<TUserDeletePermitionResponse>(
    `/api/permittion/${data.id}`
  );
  return response;
};

export const userCheckPermition = (data: TUserCheckPermitionRequest) => {
  const response = instance.get<TUserCheckPermitionResponse>(
    `/api/permittion/${data.id}`
  );
  return response;
};

export const userAddPermition = (data: TUserAddPermitionRequest) => {
  const response = instance.post<TUserAddPermitionResponse>(
    "/api/permittion",
    data
  );
  return response;
};

export const userResetPassword = (data: TUserResetPasswordRequest) => {
  const newPass = {
    password: data.password,
  };
  const response = instance.post<TUserResetPasswordResponse>(
    `/api/user-updatepass/${data.id}`,
    newPass
  );

  return response;
};

export const userEditPermition = (data: TUserEditPermitionRequest) => {
  const editedPermition = {
    subject: data.subject,
    description: data.description,
  };
  const response = instance.put<TUserAddPermitionResponse>(
    `/api/permittion/${data.permitionId}`,
    editedPermition
  );
  return response;
};
