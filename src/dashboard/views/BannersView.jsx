import { useDispatch, useSelector } from "react-redux"
import { createNewBanner } from "../../store/slices/bannerSlice/thunks";
import { Banner, Banners } from "../components/banners";
import { CreateBox } from "../components";
import { BannersForm } from "../forms/BannersForm";

export const BannersView = () => {
  const dispatch = useDispatch();
  const { activeBanner } = useSelector((state) => state.banner);
  const onClick = () => {
    dispatch(createNewBanner());
  };
  return (
    <>
      {!!activeBanner ? (
        <>
        <BannersForm />
        <Banner />
        </>
      ) : (
        <CreateBox title="Crear banner" onClick={onClick} />
      )}
      <Banners/>
    </>
  )
}
