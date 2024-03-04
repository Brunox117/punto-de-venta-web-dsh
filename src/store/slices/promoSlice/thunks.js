import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyPromo,
  addNewPromo,
  deleteActivePromo,
  deletePromoById,
  promoUpdated,
  savingNewPromo,
  setActivePromo,
  setPhotoToActivePromo,
  setPromos,
} from "./promoSlice";
import { loadPromos } from "../../../helpers/firebaseDB/loadFromFirebase";

export const createNewPromo = () => {
  return async (dispatch) => {
    dispatch(savingNewPromo());
    const newPromo = {
      align: '1',
      redirectUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      imageUrlG: "",
      id: "",
    };
    await dispatch(addNewEmptyPromo(newPromo));
    dispatch(setActivePromo(newPromo));
  };
};

export const startSavePromo = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewPromo());
    const { activePromo } = getState().promo;
    const promoToFirestore = { ...activePromo };
    //PREGUNTAR SI TIENE O NO ID SI NO TIENE SE LE DEBERIA ASIGNAR UN ID
    if (promoToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `promos/`));
      promoToFirestore.id = newDoc.id;
      const setDocResp = await setDoc(newDoc, promoToFirestore);
      // console.log({ newDoc, setDocResp });
      // console.log(`promo creado con el id: ${promoToFirestore}`);
      dispatch(setActivePromo(promoToFirestore));
      dispatch(addNewPromo(promoToFirestore));
    } else {
      delete promoToFirestore.id;
      const docRef = doc(FirebaseDB, `promos/${activePromo.id}`);
      await setDoc(docRef, promoToFirestore, { merge: true });
      dispatch(promoUpdated(activePromo));
    }
  };
};

export const startUploadingImg = (file, imgNumber) => {
  return async (dispatch, getState) => {
    const { activePromo } = getState().promo;
    const imageUrl1 = activePromo.imageUrl1;
    const imageUrl2 = activePromo.imageUrl2;
    const imageUrlG = activePromo.imageUrlG;
    if (imageUrl1 !== "" && imgNumber === 1) {
      await imgDelete(imageUrl1);
    }
    if (imageUrl2 !== "" && imgNumber === 2) {
      await imgDelete(imageUrl2);
    }
    if (imageUrlG !== "" && imgNumber === 3) {
      await imgDelete(imageUrlG);
    }
    dispatch(savingNewPromo());
    const fileUrl = await fileUpload(file);
    dispatch(
      setPhotoToActivePromo({ imgNumber: imgNumber, imageUrl: fileUrl })
    );
  };
};

export const startDeletingPromo = () => {
  return async (dispatch, getState) => {
    const { activePromo } = getState().promo;
    const imageUrl1 = activePromo.imageUrl1;
    const imageUrl2 = activePromo.imageUrl2;
    const imageUrlG = activePromo.imageUrlG;
    if (imageUrl1 !== "") {
      await imgDelete(imageUrl1);
    }
    if (imageUrl2 !== "") {
      await imgDelete(imageUrl2);
    }
    if (imageUrlG !== "") {
      await imgDelete(imageUrlG);
    }
    if (activePromo.id === "") {
      dispatch(deleteActivePromo());
    } else {
      const docRef = doc(FirebaseDB, `promos/${activePromo.id}`);
      await deleteDoc(docRef);
      dispatch(deleteActivePromo());
    }
  };
};

export const startDeletingPromoById = (promo) => {
  return async (dispatch, getState) => {
    const { activePromo } = getState().promo;
    if (activePromo && activePromo.id === promo.id) {
      dispatch(startDeletingPromo());
    }
    const imageUrl1 = promo.imageUrl1;
    const imageUrl2 = promo.imageUrl2;
    const imageUrlG = promo.imageUrlG;
    if (imageUrl1 !== "") {
      await imgDelete(imageUrl1);
    }
    if (imageUrl2 !== "") {
      await imgDelete(imageUrl2);
    }
    if (imageUrlG !== "") {
      await imgDelete(imageUrlG);
    }
    const docRef = doc(FirebaseDB, `promos/${promo.id}`);
    await deleteDoc(docRef);
    dispatch(deletePromoById(promo.id));
  };
};

export const startLoadingPromos = () => {
  return async (dispatch) => {
    const promos = await loadPromos();
    dispatch(setPromos(promos));
  };
};
