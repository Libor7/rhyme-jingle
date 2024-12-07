/** LIBRARIES */
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

/** MODELS */
import { type IPath } from "models/link";

const StyledLi = styled(motion.li)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "50%",

  "&:active": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(0.98)",
  },

  "&:hover, &:focus, &:focus-visible, &:focus-within": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledLink = styled(Link)(() => ({
  display: "block",
  padding: "0.75em",

  "&:focus-visible": {
    outline: "none",
  },
}));

const MobileLinks: FC<PropsWithChildren<IPath>> = ({ children, path }) => {
  return (
    <StyledLi
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 500 }}
      sx={{ boxShadow: 4, "&:active": { boxShadow: 2 } }}
    >
      <StyledLink to={path}>{children}</StyledLink>
    </StyledLi>
  );
};

export default MobileLinks;
