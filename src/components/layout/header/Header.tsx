/** COMPONENTS */
import Icon from "../../UI/icon/Icon";
import Navigation from "../../other/navigation/Navigation";

/** HOOKS */
import useWindowSize from "../../../hooks/useWindowSize";

/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import APP_CONTENT from "../../../models/constants";
import { HeaderIcons, IconStyles } from "../../../models/icon";
import { Links } from "../../../models/link";

/** STYLES */
import styles from "./Header.module.css";

interface HeaderProps {
  links: Links[];
}

const Header: FC<HeaderProps> = ({ links }) => {
  const { isExtraSmall, isSmall, isMedium, isLarge, isExtraLarge } =
    useWindowSize();

  return (
    <header className={styles.header}>
      <h1>{APP_CONTENT.HEADINGS.APPLICATION_TITLE}</h1>
      {(isExtraSmall || isSmall) && (
        <Icon iconClass={HeaderIcons.FEATHER} iconStyles={IconStyles.HEADER} />
      )}
      {isMedium && <Navigation links={links} row />}
      {(isLarge || isExtraLarge) && <Navigation links={links} />}
    </header>
  );
};

export default Header;
