/** COMPONENTS */
import LinkItem from "../../UI/link-item/LinkItem";

/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import { Links } from "../../../models/link";

/** STYLES */
import styles from "./Navigation.module.css";

interface NavigationProps {
  links: Links[];
  row?: boolean;
}

const Navigation: FC<NavigationProps> = ({ links, row }) => {
  const flexDirection = row ? styles.row : styles.column;
  const classes = `${styles.navigation} ${flexDirection}`;

  return (
    <nav className={classes}>
      <ul className={flexDirection}>
        {links.map((link) => (
          <LinkItem key={link.path} {...link} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
