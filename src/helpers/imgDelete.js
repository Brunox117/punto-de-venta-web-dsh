import { ref, deleteObject } from "firebase/storage";
import { FirebaseSTORAGE } from "../firebase/config";

export const imgDelete = async (imageUrl) => {
  try {
    const storageRef = ref(FirebaseSTORAGE, imageUrl);
    await deleteObject(storageRef);
    //console.log("Imagen borrada de Firebase Storage:", imageUrl);
  } catch (error) {
    console.error("Error al borrar la imagen en Firebase Storage:", error);
  }
};
