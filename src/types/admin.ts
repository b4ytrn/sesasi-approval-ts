export type TAdminUpdatePasswordRequest = {
  id?: number;
  password: string;
};

export type TAdminChangeUserLevelRequest = {
  id: number;
};

export type TAdminChangeUserLevelResponse = {
  status: boolean;
  message: string;
  data: boolean;
};

export type TAdminAddVerificatorRequest = {
  name: string;
  email: string;
  password: string;
};
