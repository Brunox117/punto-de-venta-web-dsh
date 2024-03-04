import { useDispatch } from "react-redux";
import { startLogout } from "../../store/slices/authSlice/thunks";

export const LogoutView = () => {
  const dispatch = useDispatch();
  dispatch(startLogout());
  return <div>LogoutView</div>;
};
