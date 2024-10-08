/** LIBRARIES */
import { FC, ReactNode, useEffect } from "react";

/** OTHER */
import { useAppDispatch } from "../../../store";
import { searchedActions } from "../../../store/searched";

/** STYLES */
import styles from "./Button.module.css";

interface ButtonProps {
  disabled?: boolean;
  isMarked?: boolean;
  label: ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ isMarked, disabled, label, onClick }) => {
  const appDispatch = useAppDispatch();

  const classes = `${styles.btn} ${isMarked && styles.marked}`;

  useEffect(() => {
    return () => {
      appDispatch(searchedActions.removeLengthFilter(label as number));
    };
  }, [appDispatch, label]);

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
