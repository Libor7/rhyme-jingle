/** COMPONENTS */
import DialogContent from "@mui/material/DialogContent";

/** LIBRARIES */
import { styled } from "@mui/system";

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,

  "&:focus, &:focus-visible, &:focus-within": {
    outline: "unset",
  },

  "& > .MuiFormControl-root:focus, & > .MuiFormControl-root:focus-visible, & > .MuiFormControl-root:focus-within":
    {
      outline: "unset",
    },
}));
