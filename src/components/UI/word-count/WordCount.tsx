/** LIBRARIES */
import { FC } from "react";

/** STYLES */
import styles from "./WordCount.module.css";

interface WordCountProps {
  adjectives: [string, string];
  count: number;
}

const WordCount: FC<WordCountProps> = ({ adjectives, count }) => {
  const text = count < 1 || count > 4 ? adjectives[0] : adjectives[1];

  return <h2 className={styles.span}>{count + " " + text}</h2>;
};

export default WordCount;
