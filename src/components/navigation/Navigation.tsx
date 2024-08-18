/** STYLES */
import { FC } from "react";
import styles from "./Navigation.module.css";

interface NavigationProps {
  row?: boolean;
}

const Navigation: FC<NavigationProps> = ({row}) => {
  const flexDirection = row ? styles.row : styles.column;

  return (
    <nav className={`${styles.navigation} ${flexDirection}`}>
      <ul></ul>
    </nav>
  );
};

export default Navigation;
