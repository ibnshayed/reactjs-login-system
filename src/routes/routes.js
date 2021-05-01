import LoginPage from "../pages/account/LoginPage";
import SignUpPage from "../pages/account/SignUpPage";
import { LOGIN_PATH, SIGNUP_PATH } from "./slug";

export const routes = [
	{
	  path: LOGIN_PATH,
	  component: LoginPage,
	  exact: true,
	},
	{
		path: SIGNUP_PATH,
		component: SignUpPage,
		exact: true,
	},
]