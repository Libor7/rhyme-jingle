/** COMPONENTS */
import Backdrop from "../backdrop/Backdrop";
import ModalOverlay from "../modal-overlay/ModalOverlay";

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
