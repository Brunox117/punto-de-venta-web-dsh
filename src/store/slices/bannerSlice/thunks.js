import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyBanner,
  savingNewBanner,
  setActiveBanner,
  setPhotoToActiveBanner,
  setBanners,
  deleteActiveBanner,
  deleteBannerById,
    bannerUpdated,
    addNewBanner,
} from "./bannerSlice";
import { loadBanners } from "../../../helpers/firebaseDB/loadFromFirebase";

export const createNewBanner = () => {
  return async (dispatch) => {
    dispatch(savingNewBanner());
    const newBanner = {
      redirectUrl: "",
      imageUrl: "",
      id: "",
    };
    await dispatch(addNewEmptyBanner(newBanner));
    dispatch(setActiveBanner(newBanner));
  };
};

export const startSaveBanner = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewBanner());
    const { activeBanner } = getState().banner;
    const bannerToFirestore = { ...activeBanner };
    //PREGUNTAR SI TIENE O NO ID SI NO TIENE SE LE DEBERIA ASIGNAR UN ID
    if (bannerToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `banners/`));
      bannerToFirestore.id = newDoc.id;
      const setDocResp = await setDoc(newDoc, bannerToFirestore);
      console.log({ newDoc, setDocResp });
      console.log(`banner creado con el id: ${bannerToFirestore}`);
      dispatch(setActiveBanner(bannerToFirestore));
      dispatch(addNewBanner(bannerToFirestore));
    } else {
      delete bannerToFirestore.id;
      const docRef = doc(FirebaseDB, `banners/${activeBanner.id}`);
      await setDoc(docRef, bannerToFirestore, { merge: true });
      dispatch(bannerUpdated(activeBanner));
    }
  };
};

export const startUploadingImg = (file) => {
  return async (dispatch, getState) => {
    const { activeBanner } = getState().banner;
    const imageUrl = activeBanner.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    dispatch(savingNewBanner());
    const imgUrl = await fileUpload(file);
    dispatch(setPhotoToActiveBanner(imgUrl));
  };
};

export const startDeletingBanner = () => {
  return async (dispatch, getState) => {
    const { activeBanner } = getState().banner;
    const imageUrl = activeBanner.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (activeBanner.id === "") {
      dispatch(deleteActiveBanner());
    } else {
      const docRef = doc(FirebaseDB, `banners/${activeBanner.id}`);
      await deleteDoc(docRef);
      dispatch(deleteBannerById(activeBanner.id));
    }
  };
};

export const startDeletingBannerById = (banner) => {
  return async (dispacth, getState) => {
    const { activeBanner } = getState().banner;
    if (activeBanner && activeBanner.id === banner.id) {
      dispacth(startDeletingBanner());
    }
    const imageUrl = banner.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (banner.id === "") {
    } else {
      const docRef = doc(FirebaseDB, `banners/${banner.id}`);
      await deleteDoc(docRef);
      dispacth(deleteBannerById(banner.id));
    }
  };
};

export const startLoadingBanners = () => {
  return async (dispatch) => {
    const banners = await loadBanners();
    dispatch(setBanners(banners));
  };
};
