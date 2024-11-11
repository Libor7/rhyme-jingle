/** COMPONENTS */
import IconButton from "@mui/material/IconButton";

/** CUSTOM COMPONENTS */
import DesktopLinks from "components/layout/wrappers/DesktopLinks";
import MobileLinks from "components/layout/wrappers/MobileLinks";

/** HOOKS */
import useWindowSize from "hooks/useWindowSize";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC } from "react";

/** MODELS */
import { type ILink } from "models/link";

const StyledIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "& > .MuiSvgIcon-root": {
    fontSize: "1.5em",
  }
}));

const LinkItem: FC<ILink> = ({ icon: LinkIcon, label, path }) => {
  const { isExtraSmall, isSmall } = useWindowSize();

  return isExtraSmall || isSmall ? (
    <MobileLinks path={path}>
      <StyledIcon aria-label={label} disableRipple tabIndex={-1}>
        <LinkIcon />
      </StyledIcon>
    </MobileLinks>
  ) : (
    <DesktopLinks path={path}>{label}</DesktopLinks>
  );
};

export default LinkItem;
