/** LIBRARIES */
import { FC } from "react";

/** STYLES */
import styles from "./Navigation.module.css";

interface NavigationProps {
  row?: boolean;
}

const Navigation: FC<NavigationProps> = ({row}) => {
  const flexDirection = row ? styles.row : styles.column;
  const classes = `${styles.navigation} ${flexDirection}`;

  return (
    <nav className={classes}>
      <ul></ul>
    </nav>
  );
};

export default Navigation;
