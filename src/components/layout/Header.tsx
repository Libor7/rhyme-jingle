/** CUSTOM COMPONENTS */
import Navigation from "components/other/Navigation";

/** HOOKS */
import useWindowSize from "hooks/useWindowSize";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC } from "react";

/** MODELS */
import APP_CONTENT from "models/constants";
import { type ILink } from "models/link";

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
    minWidth: "200px",
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

interface IHeaderProps {
  links: ILink[];
}

const Header: FC<IHeaderProps> = ({ links }) => {
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
