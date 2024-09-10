/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import {
  HeaderIcons,
  IconStyles,
  LinkIcons,
  UtilityIcons,
} from "../../../models/icon";

/** STYLES */
import styles from "./Icon.module.css";

interface IconProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  iconClass: HeaderIcons | LinkIcons | UtilityIcons;
  iconStyles: IconStyles;
}

const Icon: FC<IconProps> = ({ onClick, iconClass, iconStyles }) => {
  const classes = `fas ${iconClass} ${styles[iconStyles]}`;
  const clickHandler = onClick || (() => {});

  return <i className={classes} onClick={clickHandler} />;
};

export default Icon;
