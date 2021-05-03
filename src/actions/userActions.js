import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const login = (phoneNumber, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // actual process of authentication with actual backend server

    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // };

    // const { data } = await axios.post(
    //   "/api/users/login/",
    //   { phone: phoneNumber, password: password },
    //   config
    // );

    // Mock process of authentication only this situation
    let userInfo = {};

    if (password) {
      const { data } = await axios.get("http://localhost:9000/users");

      const user = data.filter(
        (user) => user.phoneNumber === phoneNumber && user.password === password
      );

      userInfo = {
        id: user[0].id,
        phoneNumber: user[0].phoneNumber,
      };
    } else {
      userInfo = {
        phoneNumber: phoneNumber,
      };
    }

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

export const register = (phoneNumber, name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // actual process works with valid backend server

    const { data } = await axios.post(
      "http://localhost:9000/users",
      { phoneNumber:phoneNumber, name: name, email: email, password: password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
