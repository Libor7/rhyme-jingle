/** COMPONENTS */
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";

/** LIBRARIES */
import { type FC } from "react";
import ReactDOM from "react-dom";

const backdropElement = document.getElementById("backdrop")!;
const overlayElement = document.getElementById("overlay")!;

interface IModalProps {
  children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop open={true} />, backdropElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        overlayElement
      )}
    </>
  );
};

export default Modal;
