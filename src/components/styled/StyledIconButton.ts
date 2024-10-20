/** COMPONENTS */
import IconButton from "@mui/material/IconButton";

/** LIBRARIES */
import { styled } from "@mui/system";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "unset",
  color: theme.palette.secondary.light,
  cursor: "pointer",
  height: "2.5em",
  padding: "0.5em",
  width: "2.5em",

  "&:hover, &:focus, &:focus-visible": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
