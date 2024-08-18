/** COMPONENTS */
import Navigation from "../navigation/Navigation";

/** HOOKS */
import useWindowSize from "../../hooks/useWindowSize";

/** MODELS */
import { Headings } from "../../models/common";

/** STYLES */
import styles from "./Header.module.css";

const Header = () => {
  const windowWidth = useWindowSize();

  const isMedium = windowWidth >= 480 && windowWidth < 900;
  const isLarge = windowWidth >= 900;
  
  return (
    <header className={styles.header}>
      <h1>{Headings.APPLICATION_TITLE}</h1>
      {isMedium && <Navigation row />}
      {isLarge && <Navigation />}
    </header>
  );
};

export default Header;
