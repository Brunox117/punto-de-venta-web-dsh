import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoadingCategories } from "../../store/slices/categorySlice/thunks";
import { startLoadingSuppliers } from "../../store/slices/supplierSlice/thunks";
import { startLoadingProducts } from "../../store/slices/productSlice";
import { startLoadingBranches } from "../../store/slices/branchSlice";
import { startLoadingPosts } from "../../store/slices/postSlice";
import { startLoadingBanners } from "../../store/slices/bannerSlice/thunks";
import { startLoadingPromos } from "../../store/slices/promoSlice/thunks";

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

export const usePosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingPosts());
  }, []);
};

export const useBanners = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingBanners());
  }, []);
}

export const usePromos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingPromos());
  }, []);
}
