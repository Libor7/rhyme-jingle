/** LIBRARIES */
import { Dispatch, FC, SetStateAction, useCallback } from "react";

/** STYLES */
import styles from "./ModalOverlay.module.css";

interface ModalOverlayProps {
  onModalClose: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onModalClose, children }) => {
  const close = useCallback(() => {
    onModalClose(false);
  }, [onModalClose]);

  return <div className={styles["modal-overlay"]}>{children}</div>;
};

export default ModalOverlay;
