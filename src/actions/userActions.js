import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const login = (phoneNumber, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // actual process of authentication with actual backend server
    // const { data } = await axios.post(
    //   "/api/users/login/",
    //   { phone: phoneNumber, password: password },
    //   config
    // );

    const { data } = await axios.get("http://localhost:9000/users");

		const user = data.filter(
      (user) => user.phoneNumber === phoneNumber && user.password === password
    );

		
    const userInfo = {
			id: user[0].id,
      phoneNumber: user[0].phoneNumber,
		};
		
		// console.log(user, '===================', userInfo);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      // payload: data,
      payload: userInfo,
    });

		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
