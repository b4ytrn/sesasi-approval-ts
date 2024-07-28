import { TPermitionsDataResponse } from "@/types/universal";
import instance from "./base-api";
import {
  TUserCancelPermitionRequest,
  TUserCancelPermitionResponse,
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
