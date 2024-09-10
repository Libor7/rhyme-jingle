/** LIBRARIES */
import { FC } from "react";
import { useSelector } from "react-redux";

/** OTHER */
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../store";
import { searchedActions } from "../../../store/searched";

/** STYLES */
import styles from "./Button.module.css";

interface ButtonProps {
  label: number;
}

const Button: FC<ButtonProps> = ({ label }) => {
  const { wordLengthFilters } = useSelector(
    (state: RootState) => state.searched
  );
  const appDispatch = useAppDispatch();

  const isBtnMarked = wordLengthFilters.indexOf(label) >= 0;

  const classes = `${styles.btn} ${isBtnMarked && styles.marked}`;

  const clickHandler = () => {
    isBtnMarked
      ? appDispatch(searchedActions.removeWordLengthFilter(label))
      : appDispatch(searchedActions.addWordLengthFilter(label));
  };

  return <button className={classes} onClick={clickHandler}>{label}</button>;
};

export default Button;
