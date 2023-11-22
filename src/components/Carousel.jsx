import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings} className="overflow-hidden box-border relative">
      <div className="relative">
        <img src="https://placehold.co/1400x500" alt="Image 1" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-4 w-full text-center">
          <h1>Caption 1</h1>
        </div>
      </div>
      <div className="relative">
        <img src="https://placehold.co/1400x500" alt="Image 2" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-4 w-full text-center">
          <h1>Caption 2</h1>
        </div>
      </div>
      <div className="relative">
        <img src="https://placehold.co/1400x500" alt="Image 3" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-4 w-full text-center">
          <h1>Caption 3</h1>
        </div>
      </div>
    </Slider>
  );
};

export default Carousel;
