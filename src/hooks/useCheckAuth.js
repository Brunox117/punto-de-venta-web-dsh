import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/slices/authSlice/authSlice";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, displayName } = user;
      dispatch(login({ uid, displayName }));
      //EMPEZAR A CARGAR LOS DATOS DE LA BASE DE DATOS
    });
  }, []);
  return {
    status,
  };
};
