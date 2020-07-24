export type GetTimeSheetRequest = {};

export type GetTimeSheetResponse = {
  success: boolean;
  result: [
    {
      _id: string;
      user: string;
      checkin: string;
      checkout: string;
      date: string;
    },
  ];
};
export type GetAdminTimeSheetResponse = {
  success: boolean;
  result: {
    user: string;
    timesheet: {
      _id: string;
      user: string;
      checkin: string;
      checkout: string;
      date: string;
    };
  };
};
