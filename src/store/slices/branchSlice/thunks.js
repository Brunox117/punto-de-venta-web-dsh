import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { addNewEmptyBranch,
    branchUpdated,
    deleteactiveBranch,
    deletebranchById,
    savingNewBranch,
    setActiveBranch,
    setPhotoToactiveBranch,
    setSaving, } from './branchSlice';
export const createNewBranch = () => {
  return async (dispatch) => {
    dispatch(savingNewBranch());
    const newBranch = {
        id: '',
            name: '',
            address: '',
            googleMapsLink: '',
            imageUrl: '',
            schedule: '',
            number: '',
    };
    await dispatch(addNewEmptyBranch(newBranch));
    dispatch(setActiveBranch(newBranch));
  };
};

export const startSaveBranch = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeBranch } = getState().branch;
    const branchToFirestore= { ...activeBranch };
    //PREGUNTAR SI TIENE O NO ID SI NO TIENE SE LE DEBERIA ASIGNAR UN ID
    console.log(branchToFirestore.id);
    if (branchToFirestore.id === "") {
      console.log('entro al if');
      const newDoc = doc(collection(FirebaseDB, `branches/`));
      const setDocResp = await setDoc(newDoc, activeBranch);
      console.log({ newDoc, setDocResp });
      branchToFirestore.id = newDoc.id;
      console.log(`branch creada con el id: ${branchToFirestore.id}`);
      dispatch(setActiveBranch(branchToFirestore));
      dispatch(branchUpdated(branchToFirestore.id));
    } else {
      delete branchToFirestore.id;
      const docRef = doc(FirebaseDB, `branches/${activeBranch.id}`);
      await setDoc(docRef, branchToFirestore, { merge: true });
      dispatch(branchUpdated(activeBranch.id));
    }
  };
};

export const startUploadingImg = (file) => {
  return async (dispatch, getState) => {
    const { activeBranch } = getState().branch;
    const imageUrl = activeBranch.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    console.log('Empezando a guardar')
    dispatch(setSaving());
    console.log('Obteniendo url')
    const imgUrl = await fileUpload(file);
    console.log('url: ', imgUrl)
    dispatch(setPhotoToactiveBranch(imgUrl));
  };
};

export const startDeletingBranch = () => {
  return async (dispatch, getState) => {
    const { activeBranch } = getState().branch;
    const imageUrl = activeBranch.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (activeBranch.id === "") {
      dispatch(deleteactiveBranch());
    } else {
      const docRef = doc(FirebaseDB, `branches/${activeBranch.id}`);
      await deleteDoc(docRef);
      dispatch(deletebranchById(activeBranch.id));
    }
  };
};
