/** COMPONENTS */
import DialogContent from "@mui/material/DialogContent";

/** LIBRARIES */
import { styled } from "@mui/system";

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,

  "&:focus-visible": {
    outline: "unset",
  },

  "& > .MuiFormControl-root:focus-visible": {
    outline: "unset",
  },
}));
