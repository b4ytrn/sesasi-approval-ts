export type TVericatorVefyUserRequest = {
  id: number;
};

export type TVericatorVerifyUserResponse = {
  status: boolean;
  message: string;
  data: [];
};

export type TVerificatorResponsePermitionRequest = {
  verificatorId: string | null;
  userId: string;
  permittionId: string;
  comment: string;
  isAccepted: boolean;
};

export type TVerificatorResponsePermitionResponse = {
  status: boolean;
  message: string;
  data: {
    verificatorId: string;
    permittionId: string;
    comment: string;
    isAccepted: boolean;
    updated_at: string;
    created_at: string;
    id: number;
  };
};
