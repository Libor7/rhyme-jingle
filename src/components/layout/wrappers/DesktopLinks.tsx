/** LIBRARIES */
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

/** MODELS */
import { type IPath } from "models/link";

const StyledMenuItem = styled(motion.li)(() => ({
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
    <StyledMenuItem
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 500 }}
    >
      <StyledMenuItemLink to={path}>{children}</StyledMenuItemLink>
    </StyledMenuItem>
  );
};

export default DesktopLinks;
