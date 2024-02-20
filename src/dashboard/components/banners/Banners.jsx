import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardMedia, Grid } from "@mui/material";
import { startDeletingBannerById } from "../../../store/slices/bannerSlice/thunks";
import { setActiveBanner } from "../../../store/slices/bannerSlice/bannerSlice";
export const Banners = () => {
  const dispatch = useDispatch();
  const {banners} = useSelector((state) => state.banner)
  const onEdit = (banner) => {
    dispatch(setActiveBanner(banner));
  };
  const onDelete = (banner) => {
    dispatch(startDeletingBannerById(banner))
  }
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 6000,
    cssEase: "linear"
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
      {banners.map((banner) => (
        <Card key={banner.id} className="banner-card">
          <CardMedia
        component="img"
        height="400"
        image={banner.imageUrl}
      />
      <Grid container justifyContent="space-between" sx={{ padding: 2 }}>
          <Button variant="contained" style={{ borderRadius: 20, backgroundColor: '#f77e0a', color: '#fff', marginTop: 10 }} onClick={() => onEdit(banner)}>Editar</Button>
          <Button variant="contained" style={{ borderRadius: 20, backgroundColor: '#f77e0a', color: '#fff', marginTop: 10 }} onClick={() => onDelete(banner)}>Borrar</Button>
      </Grid>
        </Card>
      ))}
      </Slider>
    </div>
)}

