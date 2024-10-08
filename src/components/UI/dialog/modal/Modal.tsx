/** COMPONENTS */
import Backdrop from "../backdrop/Backdrop";
import ModalOverlay from "../modal-overlay/ModalOverlay";

/** LIBRARIES */
import { Dispatch, FC, SetStateAction } from "react";
import ReactDOM from "react-dom";

/** STYLES */
import styles from "./Modal.module.css";

const backdropElement = document.getElementById("backdrop")!;
const overlayElement = document.getElementById("overlay")!;

interface ModalProps {
  children: React.ReactNode;
  closeHandler: Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ children, closeHandler }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={closeHandler} />,
        backdropElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onModalClose={closeHandler}>
          {children}
        </ModalOverlay>,
        overlayElement
      )}
    </>
  );
};

export default Modal;
