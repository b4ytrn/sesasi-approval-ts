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
