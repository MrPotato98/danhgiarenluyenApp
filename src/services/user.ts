import {request} from '../helpers/request.helper';

export const UserService = {
  getAllUsers: () => {
    return request('account/info', {method: 'GET'});
  },
  updateInfo: async (
    fullName: string,
    avaImage: string,
    workplace: string,
    address: string,
    tel: string,
    gender: string,
  ) => {
    return await request('account/info', {
      method: 'POST',
      data: {
        fullName: fullName,
        avaImage: avaImage,
        workplace: workplace,
        address: address,
        tel: tel,
        gender: gender,
      },
    });
  },
  getMyBigtable: async () => {
    return await request(`bigtable/get`, {method: 'GET'});
  },
  getMyBigtableDetail: async (_id: any) => {
    return await request(`bigtable/getDetail`, {
      method: 'POST',
      data: {_id},
    });
  },
  updateMyBigtableDetail: async (data: any) => {
    return await request(`bigtable/update-item`, {
      method: 'POST',
      data: {result: data},
    });
  },
  getBigTablePartner: async () => {
    return await request(`bigtable/get-partner`, {method: 'GET'});
  },
  deleteUser: async (idUser: any) => {
    return await request('account/delete', {
      method: 'POST',
      data: {idUser},
    });
  },
  login: async (email: string, password: string) => {
    const data = await request('account/login', {
      method: 'POST',
      data: {email, password},
    });
    return data;
  },
};
