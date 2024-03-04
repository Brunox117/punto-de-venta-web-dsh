import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { addNewEmptypost, addNewPost, deleteActivepost, deletepostById, postUpdated, savingNewpost, setActivePost, setActivepost, setPhotoToActivepost, setPosts, setSaving } from "./postSlice";
import { loadPosts } from "../../../helpers/firebaseDB/loadFromFirebase";

const obtenerFechaActual = () => {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const fecha = new Date();
  const mes = meses[fecha.getMonth()];
  const dia = fecha.getDate();
  const año = fecha.getFullYear();

  return `${mes} ${dia}, ${año}`;
};

export const createNewPost = () => {
    return async (dispatch) => {
        dispatch(savingNewpost());
        const newPost = {
        id: '',
        title: '',
        description : '',
        content: '',
        autor: '',
        imageUrl: '',
        date: obtenerFechaActual(),
        };
        await dispatch(addNewEmptypost(newPost));
        dispatch(setActivePost(newPost))
    }
} 

export const startSavePost = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        const {activePost} = getState().post;
        const postToFirestore = {...activePost};
        if (postToFirestore.id === "") {
            const newDoc = doc(collection(FirebaseDB, `posts/`));
            postToFirestore.id = newDoc.id;
            const setDocResp = await setDoc(newDoc, postToFirestore);
            // console.log({ newDoc, setDocResp });
            // console.log(`post creada con el id: ${postToFirestore.id}`);
            dispatch(setActivepost(postToFirestore));
            dispatch(addNewPost(postToFirestore));
          } else {
            delete postToFirestore.id;
            const docRef = doc(FirebaseDB, `posts/${activePost.id}`);
            await setDoc(docRef, postToFirestore, { merge: true });
            dispatch(postUpdated(activePost));
          }
    }
}

export const startUploadingImg = (file) => {
    return async (dispatch, getState) => {
      const { activePost } = getState().post;
      const imageUrl = activePost.imageUrl;
      if (imageUrl !== "") {
        await imgDelete(imageUrl);
      }
      dispatch(setSaving());
      const imgUrl = await fileUpload(file);
      dispatch(setPhotoToActivepost(imgUrl));
    };
  };

  export const startDeletingPost = () => {
    return async (dispatch, getState) => {
      const { activePost } = getState().post;
      const imageUrl = activePost.imageUrl;
      if (imageUrl !== "") {
        await imgDelete(imageUrl);
      }
      if (activePost.id === "") {
        dispatch(deleteActivepost());
      } else {
        const docRef = doc(FirebaseDB, `posts/${activePost.id}`);
        await deleteDoc(docRef);
        dispatch(deletepostById(activePost.id));
      }
    };
  }; 
  
  export const startDeletingPostById = (post) => {
    return async (dispatch, getState) => {
      const { activePost } = getState().post;
      if (activePost && activePost.id === post.id) {
        dispatch(startDeletingPost());
      }
      const imageUrl = post.imageUrl;
      if (imageUrl !== "") {
        await imgDelete(imageUrl);
      }
      if (post.id === "") {
        //YA NO DEBERIA DE CUMPLIRSE ESTE IF NUNCA
      } else {
        const docRef = doc(FirebaseDB, `posts/${post.id}`);
        await deleteDoc(docRef);
        dispatch(deletepostById(post.id));
      }
    }
  }
  
  export const startLoadingPosts = () => {
    return async (dispatch) => {
      const posts = await loadPosts();
      dispatch(setPosts(posts));
    };
  };
  