// import Swiper core and required modules
import { Navigation, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";

const StyledSlide = styled.div`
  height: 360px;
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    flex-direction: row;
    height: 400px;
  }

  div {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: var(--secondary);
    background-image: linear-gradient(
      to right,
      var(--primary),
      var(--secondary)
    );
    padding: 2rem;
    text-align: left;

    h2 {
      color: var(--background);
      text-transform: uppercase;
      text-aling: left;
      font-weight: 700;
      font-size: 1.8rem;
      margin: 0;
    }

    h3 {
      font-size: 2.2rem;
      color: var(--background);
      text-align: left;
      font-weight: 800;
      text-transform: uppercase;
      margin: 0;
      tex-decoration: underline;
    }

    @media (min-width: 768px) {
      h2 {
        font-size: 2.8rem;
        padding-right: 4rem;
      }

      h3 {
        padding-right: 4rem;
        font-size: 4.2rem;
      }
    }
  }

  img {
    width: 100%;
    height: 250px;
    @media (min-width: 768px) {
      width: 50%;
      height: 400px;
    }
    object-fit: cover;
    object-position: 20% 20%;
  }
`;

/**
 * HomeCarousel component to display a carousel of images.
 *
 * This component uses the Swiper library to create a carousel of images. It includes navigation,
 * and accessibility modules. The carousel displays one slide at a time with a space of 50px between slides.
 * It logs the Swiper instance and slide change events to the console.
 *
 * @returns {JSX.Element} - The rendered HomeCarousel component.
 */
const HomeCarousel = () => {
  return (
    <div className="swiper-container">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <StyledSlide className="slide">
            <img
              src="/images/supermarket1.jpg"
              alt="Service with a smile evrey time"
            />
            <div>
              <h2>Service with a smile</h2>
              <h3>every time</h3>
            </div>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide>
          <StyledSlide className="slide">
            <img
              src="/images/supermarket2.jpg"
              alt="Only the freshest fruit and veg!"
            />
            <div>
              <h2>Only the freshest</h2>
              <h3>fruit and veg!</h3>
            </div>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide>
          <StyledSlide className="slide">
            <img
              style={{
                transform: "scaleX(-1)",
              }}
              src="/images/supermarket3.jpg"
              alt="But one get one free on fresh fruit"
            />
            <div>
              <h2>Only the freshest</h2>
              <h3>fruit and veg!</h3>
            </div>
          </StyledSlide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
