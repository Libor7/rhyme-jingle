/** CUSTOM COMPONENTS */
import DesktopLinks from "../layout/wrappers/DesktopLinks";

import Icon from "./Icon";
import MobileLinks from "../layout/wrappers/MobileLinks";

/** HOOKS */
import useWindowSize from "../../hooks/useWindowSize";

/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import { Link as ILink } from "../../models/link";

const LinkItem: FC<ILink> = ({ icon, label, path }) => {
  const { isExtraSmall, isSmall } = useWindowSize();

  return isExtraSmall || isSmall ? (
    <MobileLinks path={path}>
      <Icon iconClass={icon} />
    </MobileLinks>
  ) : (
    <DesktopLinks path={path}>{label}</DesktopLinks>
  );
};

export default LinkItem;
