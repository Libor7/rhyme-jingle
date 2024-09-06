/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import { HeaderIcons, IconStyles, LinkIcons } from "../../../models/icon";

/** STYLES */
import styles from "./Icon.module.css";

interface IconProps {
  iconClass: HeaderIcons | LinkIcons;
  iconStyles: IconStyles;
}

const Icon: FC<IconProps> = ({iconClass, iconStyles}) => {
  const classes = `fas ${iconClass} ${styles[iconStyles]}`;

  return <i className={classes} />;
};

export default Icon;
