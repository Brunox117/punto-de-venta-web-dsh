import { useDispatch, useSelector } from "react-redux"
import { createNewBanner } from "../../store/slices/bannerSlice/thunks";
import { Banners } from "../components/banners";
import { CreateBox } from "../components";

export const BannersView = () => {
  const dispatch = useDispatch();
  const { activeBanner } = useSelector((state) => state.banner);
  const onClick = () => {
    dispatch(createNewBanner());
  };
  return (
    <>
      {!!activeBanner ? (
        <></>
      ) : (
        <CreateBox title="Crear banner" onClick={onClick} />
      )}
      <Banners/>
    </>
  )
}
