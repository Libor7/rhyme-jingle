/** COMPONENTS */
import FilterControls from "../../other/filter-controls/FilterControls";
import MiscellaneousControls from "../../other/miscellaneous-controls/MiscellaneousControls";

/** LIBRARIES */
import { FC } from "react";

/** STYLES */
import styles from "./Buttons.module.css";

interface ButtonsProps {
  disposableWords: string[];
  labels: number[];
  totalWordsFound: number;
}

const Buttons: FC<ButtonsProps> = ({
  disposableWords,
  labels,
  totalWordsFound,
}) => {
  return (
    <section className={styles.buttons}>
      <FilterControls disposableWords={disposableWords} labels={labels} />
      <MiscellaneousControls totalWordsFound={totalWordsFound} />
    </section>
  );
};

export default Buttons;
