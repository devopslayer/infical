import { useState, useRef, useEffect } from "react";
import useData from "../../hooks/useData";
import * as datefns from "date-fns";
import { FaStar, FaArrowLeft, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Modal from "../Modal/Modal";
import SwiperCard from "../SwiperCard/SwiperCard";
import "./Calendar.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollRef = useRef();
  const isScrolling = useRef(false);
  const { data, loading, error } = useData();
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const firstDayOfMonth = datefns.startOfMonth(currentDate);
  const lastDayOfMonth = datefns.lastDayOfMonth(currentDate);
  const startDate = datefns.startOfWeek(firstDayOfMonth);
  const endDate = datefns.lastDayOfWeek(lastDayOfMonth);
  const totalDate = datefns.eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weeks = ((date) => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(date[i]);
    }

    return days;
  })(totalDate);

  const isSelectedDate = (date) => {
    return selectedDate && datefns.isSameDay(date, selectedDate);
  };

  const handleScroll = (e) => {
    const container = e.target;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const toBottom =
      Math.round(scrollTop) + clientHeight + 1 >= scrollHeight &&
      Math.round(scrollTop) + clientHeight - 1 <= scrollHeight;
    const toTop = Math.round(scrollTop) - 1 <= 0;

    if (toBottom) {
      isScrolling.current = true;
      setCurrentDate((prev) => datefns.addMonths(prev, 1));
      setTimeout(() => {
        isScrolling.current = false;
      }, 0);
    }

    if (toTop) {
      isScrolling.current = true;
      setCurrentDate((prev) => datefns.subMonths(prev, 1));
      setTimeout(() => {
        isScrolling.current = false;
        container.scrollTop = 50;
      }, 0);
    }
  };

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setTimeout(() => {
        setCurrentDate((prev) => datefns.addMonths(prev, 1));
      }, 60);
    } else if (e.deltaY < 0) {
      setTimeout(() => {
        setCurrentDate((prev) => datefns.subMonths(prev, 1));
      }, 60);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.scrollTop = 1;
    }
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="logo">
          <button className="btn-back" title="Back">
            <FaArrowLeft />
          </button>
          <div className="logo-text">
            <h2>Infical</h2>
          </div>
        </div>
        <h2>{datefns.format(currentDate, "MMMM yyyy")}</h2>
        <div className="btn-nav">
          <button
            className="btn-prev"
            onClick={() => setCurrentDate(datefns.subMonths(currentDate, 1))}
            title="Prev month"
          >
            <FaAngleLeft />
          </button>
          <button
            className="btn-next"
            onClick={() => setCurrentDate(datefns.addMonths(currentDate, 1))}
            title="Next month"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
      <div
        className="calendar-scroll"
        ref={scrollRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
      >
        <div className="header-container">
          {weeks.map((week) => (
            <div key={week.toString()} className="calendar-cell header">
              {datefns.format(week, "EEEE")}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {totalDate.map((date) => {
            const matchedDate = data.find(
              (item) => item.date === datefns.format(date, "dd/MM/yyyy")
            );
            return (
              <div
                key={date.toString()}
                className="calendar-cell body"
                style={{
                  backgroundColor: isSelectedDate(date)
                    ? "#7a7ae4ff"
                    : datefns.isSameMonth(date, currentDate)
                    ? ""
                    : "#f0f0f0",
                  color: isSelectedDate(date)
                    ? "#fff"
                    : datefns.isSameDay(date, new Date())
                    ? "#7a7ae4ff"
                    : datefns.isSunday(date, currentDate)
                    ? "red"
                    : "",
                }}
                onClick={() => {
                  setSelectedDate(date);
                  if (matchedDate) {
                    const index = data.findIndex(
                      (item) => item.date === matchedDate.date
                    );
                    setActiveIndex(index);
                    toggleModal();
                  }
                }}
              >
                <div className="detail">
                  <div>{date.getDate()}</div>
                  {matchedDate && (
                    <div
                      className="data-container"
                      style={{ fontSize: "0.7rem" }}
                    >
                      <div className="stars">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <FaStar
                            key={index}
                            className={`star-icon ${
                              index < matchedDate.rating ? "" : "inactive"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="calendar-img">
                        <img
                          src={matchedDate.imgUrl}
                          alt={`calendar_image_${date.toString()}`}
                          loading="lazy"
                        />
                      </div>
                      <div className="categories-tag">
                        {matchedDate.categories.map((category, index) => (
                          <span key={index} className="category">
                            {category.charAt(0).toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <Modal showModal={showModal} toggleModal={toggleModal}>
          <SwiperCard data={data} initialIndex={activeIndex} />
        </Modal>
      )}
    </div>
  );
}

export default Calendar;
