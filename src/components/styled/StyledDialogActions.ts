/** COMPONENTS */
import DialogActions from "@mui/material/DialogActions";

/** LIBRARIES */
import { styled } from "@mui/system";

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  flexWrap: "wrap",
  padding: "0 1.5em 1em",

  "& > button.MuiButtonBase-root": {
    color: theme.palette.primary.main,
    flexGrow: 1,
  },
  "& > button.MuiButtonBase-root:focus, & > button.MuiButtonBase-root:focus-visible, & > button.MuiButtonBase-root:focus-within":
    {
      borderBottom: `2px solid ${theme.palette.primary.dark}`,
      color: theme.palette.primary.dark,
    },
}));
