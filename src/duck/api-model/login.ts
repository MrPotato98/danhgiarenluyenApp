export type UserRes = {
  token: string;
  email: string;
  info: {
    _id: string;
    email: string;
    full_name: string;
    password: null;
    job_id: number;
    address: string;
    tel: string;
    work_place: string;
    gender: boolean;
    deleted: boolean;
  };
  success: boolean;
  isValidToken: boolean;
  errorMessage: string;
};

export type UserReq = {
  email: string;
  password: string;
};
