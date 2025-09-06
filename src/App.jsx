// import { useState } from "react";
import "./App.css";
// import Modal from "./components/Modal/Modal";
// import SwiperCard from "./components/SwiperCard/SwiperCard";
import Calendar from "./components/Calendar/Calendar";

function App() {
  // const [showModal, setShowModal] = useState(false);

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  return (
    <>
      {/* Only for modal testing purposes, later need to remove both the h1 and button according to the requirements */}
      {/* <h1>Swiper Card Example - App Component</h1>
      <button onClick={toggleModal}>Open Modal</button> */}

      <Calendar />

      {/* {showModal && (
        <Modal showModal={showModal} toggleModal={toggleModal}>
          <SwiperCard />
        </Modal>
      )} */}
    </>
  );
}

export default App;
