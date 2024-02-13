import { useRef } from "react";
import { FormLayout } from "../layout/FormLayout";

export const SucursalesForm = () => {
  const fileInputRef = useRef();
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    console.log("subiendo: ", target.files);
    // dispatch(startUploadingFiles(target.files));
  };
  return (
    <>
      <FormLayout title="Crear sucursal">

      </FormLayout>
    </>
  );
};