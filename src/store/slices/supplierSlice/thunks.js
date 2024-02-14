import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { addNewEmptySupplier,
    supplierUpdated,
    deleteactiveSupplier,
    deletesupplierById,
    savingNewSupplier,
    setActiveSupplier,
    setPhotoToactiveSupplier,
    setSaving, } from './supplierSlice';
export const createNewSupplier = () => {
  return async (dispatch) => {
    dispatch(savingNewSupplier());
    const newSupplier = {
            id: '',
            name: '',
            siteLink: '',
            imageUrl: '',
    };
    await dispatch(addNewEmptySupplier(newSupplier));
    dispatch(setActiveSupplier(newSupplier));
  };
};

export const startSaveSupplier = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeSupplier } = getState().supplier;
    const supplierToFirestore= { ...activeSupplier };
    //PREGUNTAR SI TIENE O NO ID SI NO TIENE SE LE DEBERIA ASIGNAR UN ID
    console.log(supplierToFirestore.id);
    if (supplierToFirestore.id === "") {
      console.log('entro al if');
      const newDoc = doc(collection(FirebaseDB, `suppliers/`));
      supplierToFirestore.id = newDoc.id;
      const setDocResp = await setDoc(newDoc, supplierToFirestore);
      console.log({ newDoc, setDocResp });
      console.log(`supplier creada con el id: ${supplierToFirestore}`);
      dispatch(setActiveSupplier(supplierToFirestore));
      dispatch(supplierUpdated(supplierToFirestore.id));
    } else {
      delete supplierToFirestore.id;
      const docRef = doc(FirebaseDB, `suppliers/${activeSupplier.id}`);
      await setDoc(docRef, supplierToFirestore, { merge: true });
      dispatch(supplierUpdated(activeSupplier.id));
    }
  };
};

export const startUploadingImg = (file) => {
  return async (dispatch, getState) => {
    const { activeSupplier } = getState().supplier;
    const imageUrl = activeSupplier.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    console.log('Empezando a guardar')
    dispatch(setSaving());
    console.log('Obteniendo url')
    const imgUrl = await fileUpload(file);
    console.log('url: ', imgUrl)
    dispatch(setPhotoToactiveSupplier(imgUrl));
  };
};

export const startDeletingSupplier = () => {
  return async (dispatch, getState) => {
    const { activeSupplier } = getState().supplier;
    const imageUrl = activeSupplier.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (activeSupplier.id === "") {
      dispatch(deleteactiveSupplier());
    } else {
      const docRef = doc(FirebaseDB, `suppliers/${activeSupplier.id}`);
      await deleteDoc(docRef);
      dispatch(deletesupplierById(activeSupplier.id));
    }
  };
};
