/** COMPONENTS */
import FormControl from "@mui/material/FormControl";

/** LIBRARIES */
import { styled } from "@mui/system";

export const StyledPicker = styled(FormControl)(({ theme }) => ({
  color: theme.palette.primary.main,
  webkitHyphens: "auto",
  mozHyphens: "auto",
  msHyphens: "auto",
  hyphens: "auto",
  padding: "0.75em",

  "& > .MuiFormLabel-root": {
    color: theme.palette.primary.main,
    marginBottom: "1em",
  },

  "& > .MuiFormLabel-root:focus, & > .MuiFormLabel-root:focus-visible, & > .MuiFormLabel-root:focus-within":
    {
      outline: "unset",
    },

  "& span.MuiButtonBase-root.MuiRadio-root": {
    color: theme.palette.primary.main,
  },
}));
