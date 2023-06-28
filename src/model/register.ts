export interface User {
  userId?: number;
  id?: number;
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
  accessToken?: string;
  avatar?: string;
  alias?: string;
}

export interface register {
  userId?: any;
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
}
