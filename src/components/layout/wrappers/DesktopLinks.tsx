/** LIBRARIES */
import { styled } from "@mui/system";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

/** MODELS */
import { IPath } from "../../../models/link";

const StyledMenuItem = styled("li")(() => ({
  flexGrow: 1,
  textAlign: "center",

  "&:focus, &:focus-visible, &:focus-within": {
    outline: "unset",
  },
}));

const StyledMenuItemLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  fontFamily: "Parisienne, serif",
  fontSize: "1.5em",
  padding: "0.5em",
  textDecoration: "none",

  "&:hover, &:active, &:focus, &:focus-visible, &:focus-within": {
    color: theme.palette.primary.dark,
    fontWeight: 600,
  },

  "&:focus, &:focus-visible, &:focus-within": {
    outline: "unset",
  },
}));

const DesktopLinks: FC<PropsWithChildren<IPath>> = ({ children, path }) => {
  return (
    <StyledMenuItem>
      <StyledMenuItemLink to={path}>{children}</StyledMenuItemLink>
    </StyledMenuItem>
  );
};

export default DesktopLinks;
