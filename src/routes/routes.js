import EmailOtpPage from "../pages/account/EmailOtpPage";
import LoginPage from "../pages/account/LoginPage";
import LoginPhonePage from "../pages/account/LoginPhonePage";
import PhoneOtpPage from "../pages/account/PhoneOtpPage";
import SignUpPage from "../pages/account/SignUpPage";
import Dashboard from "../pages/dashboard/Dashboard";
import {
  DASHBOARD_PATH,
  EMAIL_OTP_PATH,
  LOGIN_PATH,
  LOGIN_PHONE_PATH,
  PHONE_OTP_PATH,
  SIGNUP_PATH,
} from "./slug";

export const routes = [
  {
    path: DASHBOARD_PATH,
    component: Dashboard,
    exact: true,
  },
  {
    path: LOGIN_PATH,
    component: LoginPage,
    exact: true,
  },
  {
    path: LOGIN_PHONE_PATH,
    component: LoginPhonePage,
    exact: true,
  },
  {
    path: SIGNUP_PATH,
    component: SignUpPage,
    exact: true,
  },
  {
    path: PHONE_OTP_PATH,
    component: PhoneOtpPage,
    exact: true,
  },
  {
    path: EMAIL_OTP_PATH,
    component: EmailOtpPage,
    exact: true,
  },
];
