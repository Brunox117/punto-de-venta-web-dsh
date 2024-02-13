import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FirebaseSTORAGE } from "../firebase/config";

export const fileUpload = async (file) => {
  if (!file) throw new Error("No hay un archivo para subir");

  const storageRef = ref(FirebaseSTORAGE, file.name);

  try {
    // Subir el archivo al almacenamiento de Firebase
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Archivo subido con éxito:", snapshot.totalBytes, "bytes");

    // Obtener la URL de descarga del archivo
    const downloadURL = await getDownloadURL(storageRef);
    console.log("URL de descarga del archivo:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    throw new Error(error.message);
  }
};
