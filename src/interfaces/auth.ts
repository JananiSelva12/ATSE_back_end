type loginUserType = "admin" | "user";

interface SignUpRequestParams {
  first_name: string;
  last_name: string;
  email: string;
  phoneNo: string;
  password: string;
  companyName: string;
  companyRefNo: string;
  country: string;
  userId: number
}

interface SignUpParams {
  first_name: string;
  last_name: string;
  email: string;
  phoneNo: string;
  crypted_password: string;
  // companyName: string;
  // companyRefNo: string;
  country: string;
  userId: number
}

interface UserParams {
  first_name: string;
  last_name: string;
  email: string;
  phoneNo: string;
  crypted_password: string;
  // companyId: number;
  is_marketing: boolean;
  role_ids: number[];
  userId: number;
}

interface LoginParams {
  userName: string;
  password: string;
}

interface AuthParams {
  id: string;
  password: string;
}

interface ForgotPasswordPayload {
  email: string;
}

interface VerifyEmailPayload {
  token: string;
  email: string;
}

interface ResetPasswordPayload {
  oldPassword: string;
  crypted_password: string;
  email: string;
  loginType: string;
}
interface SwitchAccountParams {
  parentId: string;
  studentId: string;
}

export {
  loginUserType,
  SignUpParams,
  SignUpRequestParams,
  LoginParams,
  AuthParams,
  ForgotPasswordPayload,
  VerifyEmailPayload,
  ResetPasswordPayload,
  SwitchAccountParams,
  UserParams,
};
