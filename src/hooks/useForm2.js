import React, { useEffect, useRef, useState } from "react";

export const useForm2 = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [isFormValid, setIsFormValid] = useState(false); // Nuevo estado para indicar si el formulario es válido

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  useEffect(() => {
    setFormState((prevFormState) => ({
      ...prevFormState,
    }));
  }, [initialForm]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  useEffect(() => {
    let isValid = true; // Inicialmente asumimos que el formulario es válido

    // Si hay alguna validación, ejecutarla
    if (Object.keys(formValidations).length > 0) {
      for (const formField of Object.keys(formValidations)) {
        const [fn] = formValidations[formField];
        isValid = isValid && fn(formState[formField]); // Comprobamos si cada campo cumple su validación
      }
    }

    setIsFormValid(isValid); // Actualizamos el estado de isFormValid
  }, [formState, formValidations]);

  return {
    ...formState,
    onInputChange,
    setFormState,
    isFormValid, // Exportamos isFormValid junto con el estado del formulario
  };
};
