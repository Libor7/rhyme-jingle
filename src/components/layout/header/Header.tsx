/** COMPONENTS */
import Icon from "../../UI/icon/Icon";
import Navigation from "../../navigation/Navigation";

/** HOOKS */
import useWindowSize from "../../../hooks/useWindowSize";

/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import { Headings } from "../../../models/common";
import { HeaderIcons, IconStyles } from "../../../models/icon";
import { Links } from "../../../models/link";

/** STYLES */
import styles from "./Header.module.css";

interface HeaderProps {
  links: Links[];
}

const Header: FC<HeaderProps> = ({links}) => {
  const { isSmall, isMedium, isLarge } = useWindowSize();
  
  return (
    <header className={styles.header}>
      <h1>{Headings.APPLICATION_TITLE}</h1>
      {isSmall && <Icon iconClass={HeaderIcons.FEATHER} iconStyles={IconStyles.HEADER} />}
      {isMedium && <Navigation links={links} row />}
      {isLarge && <Navigation links={links} />}
    </header>
  );
};

export default Header;
