import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoadingCategories } from "../../store/slices/categorySlice/thunks";
import { startLoadingSuppliers } from "../../store/slices/supplierSlice/thunks";
import { startLoadingProducts } from "../../store/slices/productSlice";
import { startLoadingBranches } from "../../store/slices/branchSlice";

export const useCategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingCategories());
  }, []);
};

export const useProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingProducts());
  }, []);
};

export const useSuppliers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingSuppliers());
  }, []);
};

export const useBranches = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingBranches());
  }, []);
};
