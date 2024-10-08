/** LIBRARIES */
import { Dispatch, FC, SetStateAction } from "react";

/** STYLES */
import styles from "./Backdrop.module.css";

interface BackdropProps {
    onClick: Dispatch<SetStateAction<boolean>>; 
}

const Backdrop: FC<BackdropProps> = ({ onClick }) => {
    return (
        <div className={styles['backdrop-base']} onClick={() => onClick(false)} />
    );
  };
  
  export default Backdrop;