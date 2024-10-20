/** LIBRARIES */
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

/** MODELS */
import { Icon as IconEnum, IconStyle } from "../../../models/icon";

/** STYLES */
import styles from "./Icon.module.css";

export interface IconHandle {
  mouseoutHandler: () => void;
  mouseoverHandler: () => void;
}

interface IconProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  iconClass: IconEnum;
  iconStyles: IconStyle;
}

const Icon = forwardRef<IconHandle, IconProps>(
  ({ onClick, iconClass, iconStyles }, ref) => {
    const iRef = useRef<HTMLElement>(null);

    const classes = `fas ${iconClass} ${styles[iconStyles]}`;

    const mouseoutHandler = useCallback(
      () => iRef.current?.classList.remove(styles["icon-hover"]),
      []
    );

    const mouseoverHandler = useCallback(
      () => iRef.current?.classList.add(styles["icon-hover"]),
      []
    );

    useImperativeHandle(ref, () => ({
      mouseoutHandler,
      mouseoverHandler,
    }));

    return <i ref={iRef} className={classes} onClick={onClick} />;
  }
);

export default Icon;
