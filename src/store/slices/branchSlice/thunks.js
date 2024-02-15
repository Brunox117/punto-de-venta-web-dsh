import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewBranch,
  addNewEmptyBranch,
  branchUpdated,
  deleteActiveBranch,
  deletebranchById,
  savingNewBranch,
  setActiveBranch,
  setPhotoToActiveBranch,
  setSaving,
  setBranches,
} from "./branchSlice";
import { loadBranches } from "../../../helpers/firebaseDB/loadFromFirebase";
export const createNewBranch = () => {
  return async (dispatch) => {
    dispatch(savingNewBranch());
    const newBranch = {
      id: "",
      name: "",
      address: "",
      number: "",
      imageUrl: "",
      schedule: "",
      googleMapsLink: "",
    };
    await dispatch(addNewEmptyBranch(newBranch));
    dispatch(setActiveBranch(newBranch));
  };
};

export const startSaveBranch = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeBranch } = getState().branch;
    const branchToFirestore = { ...activeBranch };
    //PREGUNTAR SI TIENE O NO ID SI NO TIENE SE LE DEBERIA ASIGNAR UN ID
    if (branchToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `branches/`));
      branchToFirestore.id = newDoc.id;
      const setDocResp = await setDoc(newDoc, branchToFirestore);
      console.log({ newDoc, setDocResp });
      console.log(`branch creada con el id: ${branchToFirestore.id}`);
      dispatch(setActiveBranch(branchToFirestore));
      dispatch(addNewBranch(branchToFirestore));
    } else {
      delete branchToFirestore.id;
      const docRef = doc(FirebaseDB, `branches/${activeBranch.id}`);
      await setDoc(docRef, branchToFirestore, { merge: true });
      dispatch(branchUpdated(activeBranch));
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
    dispatch(setSaving());
    const imgUrl = await fileUpload(file);
    dispatch(setPhotoToActiveBranch(imgUrl));
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
      dispatch(deleteActiveBranch());
    } else {
      const docRef = doc(FirebaseDB, `branches/${activeBranch.id}`);
      await deleteDoc(docRef);
      dispatch(deletebranchById(activeBranch.id));
    }
  };
};

export const startDeletingBranchById = (branch) => {
  return async (dispatch, getState) => {
    const { activeBranch } = getState().branch;
    if (activeBranch && activeBranch.id === branch.id) {
      dispatch(startDeletingBranch());
    }
    const imageUrl = branch.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (branch.id === "") {
      //YA NO DEBERIA DE CUMPLIRSE ESTE IF NUNCA
    } else {
      const docRef = doc(FirebaseDB, `branches/${branch.id}S`);
      await deleteDoc(docRef);
      dispatch(deletebranchById(branch.id));
    }
  }
}

export const startLoadingBranches = () => {
  return async (dispatch) => {
    const branches = await loadBranches();
    dispatch(setBranches(branches));
  };
};
