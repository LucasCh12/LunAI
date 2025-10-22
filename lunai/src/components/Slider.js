import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css"; // opcional para estilos

export default function ImageSlider() {
  const settings = {
  infinite: true,
  slidesToShow: 1,       // mostrar solo una por vez
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  dots: true,
  centerMode: true,       // centra la slide activa
  centerPadding: "0px"    // sin padding extra a los lados
    };

  return (
    <div style={{ width: "80%", margin: "30px auto" }}>
      <Slider {...settings}>
        <div><img src="/lunar1.jpg" alt="1" className="slider-image" /></div>
        <div><img src="/lunar2.png" alt="2" className="slider-image" /></div>
        <div><img src="/lunar3.jpg" alt="3" className="slider-image" /></div>
      </Slider>
    </div>
  );
}