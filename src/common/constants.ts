export const FILE_USER_TOKEN: string = 'DANH_GIA_REN_LUYEN';

export const JOB: any = {
  MANAGER: {id: 1, title: 'Giám đốc'},
  EMPLOYEE: {id: 2, title: 'Nhân viên'},
  DEPUTY: {id: 3, title: 'Phó Giám đốc'},
};

export const GENDER: any = {
  MALE: {id: 1, gender: 'Nam'},
  FEMALE: {id: 2, gender: 'Nữ'},
};
export const COLOR: any = {
  iconColor: '#52bcd4',
  white: '#FFFFFF',
  appColor: '#52bcd4',
  bg: '#F9F9F9',
  text: '#1D2029',
  blur: 'rgba(171, 180, 189, 0.95)',
};
export const errorMessage: any = {
  '500': 'Hệ thống hiện đang gặp trục trặc, xin vui lòng thử lại sau',
  '400': 'Lỗi hệ thống, vui lòng thử lại sau',
  user: {
    '401': {
      login: 'Sai tên đăng nhập hoặc mật khẩu',
      register: 'Đăng ký không thành công',
    },
  },
};
