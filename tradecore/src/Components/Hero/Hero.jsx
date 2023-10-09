import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import "./Hero.css";
import "swiper/css";
import { Link } from "react-router-dom";

const Hero = () => {
  const swipeInfo = [
    {
      img: "img/skate.png",
      content: "Discover unique treasures and make some extra cash by selling your own items. Join us today",
      id: 1,
      bg: "img/bookss.jpeg"
    },
    {
      img: "img/books.png",
      content: "Simplicity and sustainability meet at the Westminster University Declutter Marketplace. Browse our collection of decluttered items and shop guilt-free!",
      id: 2,
      bg: "img/second.jpg"
    },
    {
      img: "img/gamingpad.png",
      content: " Our community of buyers and sellers make it easy to give unused items a new purpose.",
      id: 3,
      bg: "img/woman.jpeg"
    },
  ]
  return (
    <div className="hero">
      <div className="big-screen">

      
      <Swiper

        
        spaceBetween={0}
        slidesPerView={1}
      
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="sliderContainer"
        
      >
        
        {
          swipeInfo.map((item)=>{
            const {img, content, bg,id} = item;

            return(
              <SwiperSlide key={id} className="slideItem">
          <div className="imagecontainer">
            <img src={bg} alt="gamingpads"/>


          </div> 
          <div className="description">
            <h2 style={{color:"white"}}>
              {content}
            </h2>

          </div>
          </SwiperSlide>
            )
          })
        }

       
      
      </Swiper>
      </div>

      <div className="hero-mobile">
        <div>
          <h2>Welcome to our Market Place</h2>
          <Link to="#market">Explore</Link>
        </div>

      </div>
    </div>
  );
};

export default Hero;
