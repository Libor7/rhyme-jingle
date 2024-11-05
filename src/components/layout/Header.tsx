/** CUSTOM COMPONENTS */
import Navigation from "../other/Navigation";

/** HOOKS */
import useWindowSize from "../../hooks/useWindowSize";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

/** MODELS */
import APP_CONTENT from "../../models/constants";
import { Link } from "../../models/link";

const StyledHeader = styled("header")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.light,
  display: "flex",

  [theme.breakpoints.up("sm")]: {
    justifyContent: "flex-start",
  },

  [theme.breakpoints.up("md")]: {
    flexDirection: "column",
    textAlign: "center",
    width: "200px",
  },
}));

const StyledHeading = styled("h1")(() => ({
  fontFamily: "Parisienne, serif",
  fontWeight: "normal",
  webkitHyphens: "auto",
  mozHyphens: "auto",
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
  const { isMedium, isLarge, isExtraLarge } = useWindowSize();
  const isDesktopSize = isMedium || isLarge || isExtraLarge;

  return (
    <StyledHeader>
      <StyledHeading>{APP_CONTENT.HEADINGS.APPLICATION_TITLE}</StyledHeading>
      {isDesktopSize && <Navigation links={links} row={isMedium} />}
    </StyledHeader>
  );
};

export default Header;
