/** COMPONENTS */
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";

/** LIBRARIES */
import { FC } from "react";
import ReactDOM from "react-dom";

const backdropElement = document.getElementById("backdrop")!;
const overlayElement = document.getElementById("overlay")!;

interface ModalProps {
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
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
