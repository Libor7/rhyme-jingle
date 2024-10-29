/** COMPONENTS */
import LinkItem from "../UI/LinkItem";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

/** MODELS */
import { Link } from "../../models/link";

const StyledNav = styled("nav")<StyledProps>(({ theme, row }) => ({
  alignItems: "center",
  backgroundColor: theme.palette.primary.light,
  display: "flex",
  flexDirection: row ? "row" : "column",
}));

const StyledUl = styled("ul")<StyledProps>(({ theme, row }) => ({
  display: "flex",
  flexDirection: row ? "row" : "column",
  flexWrap: "wrap",
  listStyleType: "none",
  margin: "0.5em 1.5em",
  padding: 0,

  [theme.breakpoints.up("md")]: {
    margin: "1.5em 0",
  },
}));

interface NavigationProps {
  links: Link[];
  row?: boolean;
}

interface StyledProps {
  row: boolean;
}

const Navigation: FC<NavigationProps> = ({ links, row }) => {
  return (
    <StyledNav row={!!row}>
      <StyledUl row={!!row}>
        {links.map((link) => (
          <LinkItem key={link.path} {...link} />
        ))}
      </StyledUl>
    </StyledNav>
  );
};

export default Navigation;
