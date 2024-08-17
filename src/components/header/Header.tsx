/** MODELS */
import { Headings } from "../../models/common";

/** STYLES */
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>{Headings.APPLICATION_TITLE}</h1>
    </header>
  );
};

export default Header;
