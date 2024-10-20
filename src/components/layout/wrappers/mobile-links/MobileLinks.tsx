/** LIBRARIES */
import { styled } from "@mui/system";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

/** MODELS */
import { IPath } from "../../../../models/link";

const StyledLi = styled("li")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "25%",
  webkitBoxShadow:
    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  mozBoxShadow:
    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",

  "&:active": {
    backgroundColor: theme.palette.primary.dark,
    webkitBoxShadow:
      "rgba(0, 0, 0, 0.16) 0px 1.5px 3px, rgba(0, 0, 0, 0.23) 0px 1.5px 3px",
    mozBoxShadow:
      "rgba(0, 0, 0, 0.16) 0px 1.5px 3px, rgba(0, 0, 0, 0.23) 0px 1.5px 3px",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 1.5px 3px, rgba(0, 0, 0, 0.23) 0px 1.5px 3px",
    transform: "scale(0.98)",
  },

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  padding: "1em",
}));

const MobileLinks: FC<PropsWithChildren<IPath>> = ({
  children,
  path,
}) => {
  return (
    <StyledLi>
      <StyledLink to={path}>{children}</StyledLink>
    </StyledLi>
  );
};

export default MobileLinks;
