/** COMPONENTS */
import Icon from "../icon/Icon";

/** HOOKS */
import useWindowSize from "../../../hooks/useWindowSize";

/** LIBRARIES */
import { FC } from "react";
import { Link } from "react-router-dom";

/** MODELS */
import { IconStyles } from "../../../models/icon";
import { Links } from "../../../models/link";

/** STYLES */
import styles from "./LinkItem.module.css";

const LinkItem: FC<Links> = ({ icon, label, path }) => {
  const { isExtraSmall, isSmall } = useWindowSize();

  const classes = isExtraSmall || isSmall ? styles.btn : styles["menu-item"];
  const linkLabel =
    isExtraSmall || isSmall ? (
      <Icon iconClass={icon} iconStyles={IconStyles.BUTTON} />
    ) : (
      label
    );

  return (
    <li className={classes}>
      <Link to={path}>{linkLabel}</Link>
    </li>
  );
};

export default LinkItem;
