import {
  loginWithEmailPassword,
  logoutFirebase,
} from "../../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startLogin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, name, errorMessage } = await loginWithEmailPassword({
      email,
      password,
    });
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, name }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
