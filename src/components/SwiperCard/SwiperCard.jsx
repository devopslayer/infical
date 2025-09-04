import useData from "../../hooks/useData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Keyboard,
} from "swiper/modules";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";
import "./SwiperCard.css";

function SwiperCard() {
  const { data, loading, error } = useData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  function formatDate(fulldate) {
    const [day, month, year] = fulldate.split("/").map(Number);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (!day || !month || !year || month > 12 || day > 31) {
      return "Invalid date";
    }

    return `${day} ${months[month - 1]}`;
  }

  // console.log(data);

  return (
    <div className="sc-container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
        keyboard={{ enabled: true }}
        className="swiper_container"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="sc-card-img">
              <img
                src={item.imgUrl}
                alt={`slide_image_${index}`}
                loading="lazy"
              />
            </div>
            <div className="sc-card-body">
              <div className="sc-card-header">
                <div className="categories-tag">
                  {item.categories.map((category, index) => (
                    <span key={index} className="category">
                      {category.charAt(0).toUpperCase()}
                    </span>
                  ))}
                </div>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`star-icon ${
                        index < item.rating ? "" : "inactive"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="sc-card-details">
                <h3 className="date">{formatDate(item.date)}</h3>
                <p className="description">{item.description}</p>
              </div>
            </div>
            <div className="sc-card-footer">
              <button className="view-btn" title="View Full Post">
                View Full Post
              </button>
            </div>
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <button
            className="swiper-button-prev slider-arrow"
            title="Previous Slide"
          >
            <FaAngleLeft className="arrow-icon" />
          </button>
          <button
            className="swiper-button-next slider-arrow"
            title="Next Slide"
          >
            <FaAngleRight className="arrow-icon" />
          </button>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default SwiperCard;
