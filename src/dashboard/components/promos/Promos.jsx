import { useDispatch, useSelector } from "react-redux";
import { Promo } from "./Promo";
import { setActivePromo } from "../../../store/slices/promoSlice/promoSlice";
import { startDeletingPromoById } from "../../../store/slices/promoSlice/thunks";

export const Promos = () => {
  const dispatch = useDispatch();
  const { promos } = useSelector((state) => state.promo);
  const onEdit = (promo) => {
    dispatch(setActivePromo(promo));
  };
  const onDelete = (promo) => {
    dispatch(startDeletingPromoById(promo));
  };
  return (
    <div>
      {promos.map((promo) => (
        <Promo
          key={promo.id}
          promo={promo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
