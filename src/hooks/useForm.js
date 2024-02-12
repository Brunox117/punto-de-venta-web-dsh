import { useEffect, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);

  // Actualizar el estado del formulario cuando activeProduct cambie
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // Actualizar el estado de las categorías cuando activeProduct cambie
  useEffect(() => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      categories: initialForm.categories || [],
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
    // Si hay alguna validación, ejecutarla
    if (Object.keys(formValidations).length > 0) {
      const formCheckedValues = {};
      for (const formField of Object.keys(formValidations)) {
        const [fn, errorMessage = "Error en el campo"] = formValidations[formField];
        formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
      }
      setFormState((prevFormState) => ({
        ...prevFormState,
        ...formCheckedValues,
      }));
    }
  }, [formState, formValidations]);

  return {
    ...formState,
    onInputChange,
  };
};
