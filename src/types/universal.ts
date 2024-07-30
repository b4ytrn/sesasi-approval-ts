export type TUserCredential = {
  email: string;
  password: string;
};

export type TUserRegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type TUserRegisterResponse = {
  data: Pick<TUserData, "id" | "name" | "email" | "created_at" | "updated_at">;
  access_token: string;
  token_type: string;
};

export type TLoginResponse = {
  status: boolean;
  message: string;
  access_token: string;
  data: {
    id: number;
    name: string;
    email: string;
    isVerified: number;
    level: number;
  };
};

export type TLogoutResponse = {
  status: true;
  message: string;
  data: {
    attributes: {};
    request: {};
    query: {};
    server: {};
    files: {};
    cookies: {};
    headers: {};
  };
};

export type TUserData = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  isVerified: number;
  level: number;
  created_at: string;
  updated_at: string;
};

export type TUsersDataResponse = {
  status: number;
  message: string;
  data: TUserData[];
};

export type TPermition = {
  id: number;
  userId: number;
  subject: string;
  description: string;
  isApplied: number;
  created_at: string;
  updated_at: string;
};

export type TPermitionsDataResponse = {
  status: boolean | number;
  message: string;
  data: TPermition[];
};
