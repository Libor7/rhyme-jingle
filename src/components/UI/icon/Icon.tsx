/** LIBRARIES */
import { FC } from "react";

/** STYLES */
import styles from "./Icon.module.css";

interface IconProps {
  iconClass: string;
  iconStyles: string;
}

const Icon: FC<IconProps> = ({iconClass, iconStyles}) => {
  const classes = `fas ${iconClass} ${styles[iconStyles]}`;

  return <i className={classes} />;
};

export default Icon;
