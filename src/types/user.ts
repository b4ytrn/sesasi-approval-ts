import { TPermition } from "./universal";

export type TUserCancelPermitionRequest = {
  id: number;
};

export type TUserCancelPermitionResponse = {
  status: boolean;
  message: string;
  data: boolean;
};

export type TUserDeletePermitionRequest = {
  id: number;
};

export type TUserDeletePermitionResponse = {
  status: boolean;
  message: string;
  data: {
    status: string;
    message: string;
  };
};

export type TUserCheckPermitionRequest = {
  id: number;
};

export type TUserCheckPermitionResponse = {
  status: boolean;
  message: string;
  data: {
    status: string;
    data: TPermition;
  };
};

export type TUserAddPermitionRequest = {
  subject: string;
  description: string;
};

export type TUserAddPermitionResponse = {
  status: boolean;
  message: string;
  data: Pick<
    TPermition,
    "id" | "userId" | "subject" | "description" | "created_at" | "updated_at"
  >;
};

export type TUserResetPasswordRequest = {
  id: number;
  password: string;
};

export type TUserResetPasswordResponse = {
  status: boolean;
  message: string;
  data: number;
};
