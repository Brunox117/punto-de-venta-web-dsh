import { useDispatch, useSelector } from "react-redux";
import { PromocionesForm } from "../forms";
import { createNewPromo } from "../../store/slices/promoSlice/thunks";
import { CreateBox } from "../components";
import { Promo } from "../components/promos/Promo";
import { Promos } from "../components/promos";

export const PromocionesView = () => {
  const dispatch = useDispatch();
  const { activePromo } = useSelector((state) => state.promo);
  const onClick = () => {
    dispatch(createNewPromo());
  };
  return (
    <>
      {!!activePromo ? (
        <>
          <PromocionesForm />
          <Promo promo={activePromo} />
        </>
      ) : (
        <CreateBox title="Crear promocion" onClick={onClick} />
      )}
      <br />
      <Promos />
    </>
  );
};
