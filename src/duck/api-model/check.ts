export type CheckRequest = {};

export type CheckResponse = {
  success: boolean;
  result: {
    _id: string;
    user: string;
    checkin: string;
    checkout: string;
    date: string;
  };
};
