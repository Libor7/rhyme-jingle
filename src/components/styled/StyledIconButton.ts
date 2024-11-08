/** COMPONENTS */
import IconButton from "@mui/material/IconButton";

/** LIBRARIES */
import { styled } from "@mui/system";

interface IStyledIconButtonProps {
  toggleflag?: number;
}

export const StyledIconButton = styled(IconButton)<IStyledIconButtonProps>(
  ({ theme, toggleflag }) => ({
    backgroundColor: toggleflag ? theme.palette.primary.light : theme.palette.primary.main,
    borderRadius: "unset",
    color: theme.palette.secondary.light,
    cursor: "pointer",
    height: "2.5em",
    padding: "0.5em",
    width: "2.5em",

    "&:hover, &:focus, &:focus-visible, &:focus-within": {
      backgroundColor: toggleflag
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    },
  })
);
