/** COMPONENTS */
import Icon from "../../UI/icon/Icon";
import Navigation from "../../navigation/Navigation";

/** HOOKS */
import useWindowSize from "../../../hooks/useWindowSize";

/** MODELS */
import { Headings } from "../../../models/common";
import { HeaderIcons, IconStyles } from "../../../models/icon";

/** STYLES */
import styles from "./Header.module.css";

const Header = () => {
  const windowWidth = useWindowSize();

  const isSmall = windowWidth <= 480;
  const isMedium = windowWidth > 480 && windowWidth < 900;
  const isLarge = windowWidth >= 900;
  
  return (
    <header className={styles.header}>
      <h1>{Headings.APPLICATION_TITLE}</h1>
      {isSmall && <Icon iconClass={HeaderIcons.FEATHER} iconStyles={IconStyles.HEADER} />}
      {isMedium && <Navigation row />}
      {isLarge && <Navigation />}
    </header>
  );
};

export default Header;
