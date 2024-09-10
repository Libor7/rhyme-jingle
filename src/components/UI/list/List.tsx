/** COMPONENTS */
import ListItem from "../list-item/ListItem";

/** LIBRARIES */
import { FC } from "react";

/** STYLES */
import styles from "./List.module.css";

interface ListProps {
  words: string[];
}

const List: FC<ListProps> = ({ words }) => {
  return (
    <ul className={styles.ul}>
      {words.map((word) => (
        <ListItem key={word} label={word} />
      ))}
    </ul>
  );
};

export default List;
