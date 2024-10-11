/** LIBRARIES */
import { FC, PropsWithChildren, useEffect } from "react";

/** OTHER */
import { useAppDispatch } from "../../../store";
import { searchedActions } from "../../../store/searched";

/** STYLES */
import styles from "./Button.module.css";

interface ButtonProps {
  disabled?: boolean;
  isMarked?: boolean;
  label?: number;
  onClick: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  disabled,
  children,
  isMarked,
  label,
  onClick,
}) => {
  const appDispatch = useAppDispatch();

  const classes = `${styles.btn} ${isMarked && styles.marked}`;

  useEffect(() => {
    return () => {
      if (label) appDispatch(searchedActions.removeLengthFilter(label));
    };
  }, [appDispatch, label]);

  return (
    <button type="button" className={classes} onClick={onClick} disabled={disabled}>
      {!label ? children : label}
    </button>
  );
};

export default Button;
