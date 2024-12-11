/** COMPONENTS */
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";

/** LIBRARIES */
import { type PropsWithChildren, type FC } from "react";
import ReactDOM from "react-dom";

const backdropElement = document.getElementById("backdrop")!;
const overlayElement = document.getElementById("overlay")!;

const Modal: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, backdropElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        overlayElement
      )}
    </>
  );
};

export default Modal;
