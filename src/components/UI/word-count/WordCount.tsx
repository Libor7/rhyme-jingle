/** LIBRARIES */
import { FC } from "react";

/** STYLES */
import styles from "./WordCount.module.css";

interface WordCountProps {
  count: number;
}

const WordCount: FC<WordCountProps> = ({ count }) => {
  const text = count < 1 || count > 4 ? "nájdených" : "nájdené";

  return <h2 className={styles.span}>{count + " " + text}</h2>;
};

export default WordCount;
