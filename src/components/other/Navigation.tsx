/** COMPONENTS */
import LinkItem from "../UI/LinkItem";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC } from "react";

/** MODELS */
import { type ILink } from "../../models/link";

const StyledNav = styled("nav")<IStyledProps>(({ theme, row }) => ({
  alignItems: "center",
  backgroundColor: theme.palette.primary.light,
  display: "flex",
  flexDirection: row ? "row" : "column",
}));

const StyledUl = styled("ul")<IStyledProps>(({ theme, row }) => ({
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

interface INavigationProps {
  links: ILink[];
  row?: boolean;
}

interface IStyledProps {
  row: boolean;
}

const Navigation: FC<INavigationProps> = ({ links, row }) => {
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
