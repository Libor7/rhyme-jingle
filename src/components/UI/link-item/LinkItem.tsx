/** CUSTOM COMPONENTS */
import DesktopLinks from "../../layout/wrappers/desktop-links/DesktopLinks";
import Icon from "../icon/Icon";
import MobileLinks from "../../layout/wrappers/mobile-links/MobileLinks";

/** HOOKS */
import useWindowSize from "../../../hooks/useWindowSize";

/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import { IconStyle } from "../../../models/icon";
import { Link as ILink } from "../../../models/link";

const LinkItem: FC<ILink> = ({ icon, label, path }) => {
  const { isExtraSmall, isSmall } = useWindowSize();

  return isExtraSmall || isSmall ? (
    <MobileLinks path={path}>
      <Icon iconClass={icon} iconStyles={IconStyle.BUTTON} />
    </MobileLinks>
  ) : (
    <DesktopLinks path={path}>{label}</DesktopLinks>
  );
};

export default LinkItem;
