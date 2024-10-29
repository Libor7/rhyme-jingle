/** CUSTOM COMPONENTS */
import Icon from "../UI/Icon";
import Navigation from "../other/Navigation";

/** HOOKS */
import useWindowSize from "../../hooks/useWindowSize";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

/** MODELS */
import APP_CONTENT from "../../models/constants";
import { Icon as IconEnum } from "../../models/icon";
import { Link } from "../../models/link";

const StyledHeader = styled("header")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.light,
  display: "flex",
  justifyContent: "space-between",

  [theme.breakpoints.up("sm")]: {
    justifyContent: "flex-start",
  },

  [theme.breakpoints.up("md")]: {
    flexDirection: "column",
    textAlign: "center",
    width: "200px",
  },
}));

const StyledHeading = styled("h1")(({ theme }) => ({
  fontFamily: "Parisienne, serif",
  fontWeight: "normal",
  WebkitHyphens: "auto",
  MozHyphens: "auto",
  msHyphens: "auto",
  hyphens: "auto",
  margin: 0,
  padding: "0.5em",
  textAlign: "center",
}));

interface HeaderProps {
  links: Link[];
}

const Header: FC<HeaderProps> = ({ links }) => {
  const { isExtraSmall, isSmall, isMedium, isLarge, isExtraLarge } =
    useWindowSize();

  return (
    <StyledHeader>
      <StyledHeading>{APP_CONTENT.HEADINGS.APPLICATION_TITLE}</StyledHeading>
      {(isExtraSmall || isSmall) && (
        <Icon iconClass={IconEnum.FEATHER} iconStyle="header" />
      )}
      {isMedium && <Navigation links={links} row />}
      {(isLarge || isExtraLarge) && <Navigation links={links} />}
    </StyledHeader>
  );
};

export default Header;
