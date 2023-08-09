import ReactDOM from "react-dom";
import CrossIcon from "../../assets/icons/cross.png";

const Modal = ({ children, handleClick, className }) => {
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"></div>
      <div className={`rounded-xl fixed text-white top-0 left-0 right-0 bottom-0 m-auto h-fit bg-se-gray z-50 ${className}`}>
        <button className="absolute top-0 right-0 mr-3 mt-2 z-50" onClick={handleClick}>
          <img src={CrossIcon} alt="cross" className="w-5 h-5 hover:opacity-70" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
