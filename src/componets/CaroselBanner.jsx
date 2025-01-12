import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CaroselBanner() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div style={{ height: 'auto', width:'full', overflow: 'hidden' }}>
      <Slider {...settings}>
        <div>
          <Image 
            src="/images/banner1.jpg" 
            alt="Image 1" 
            width={500} 
            height={300} 
            layout="responsive"
          />
        </div>
        <div>
          <Image 
            src="/images/banner3.jpg" 
            alt="Image 2" 
            width={500} 
            height={300} 
            layout="responsive" 
          />
        </div>
        <div>
          <Image 
            src="/images/banner2.jpg" 
            alt="Image 3" 
            width={500} 
            height={300} 
            layout="responsive" 
          />
        </div>
      </Slider>
    </div>
  );
}

export default CaroselBanner;
