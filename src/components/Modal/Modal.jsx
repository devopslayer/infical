import { FaTimes } from "react-icons/fa";
import "./Modal.css";

function Modal({ showModal, toggleModal, children }) {
  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={toggleModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-button" onClick={toggleModal} title="Close">
            <FaTimes />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
