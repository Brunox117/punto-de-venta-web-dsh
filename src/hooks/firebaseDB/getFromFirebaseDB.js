import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoadingCategories } from "../../store/slices/categorySlice/thunks";

export const useCategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingCategories());
  }, []);
};
