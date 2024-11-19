/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC, type PropsWithChildren } from "react";

const StyledSpan = styled("span")(() => ({
  "& > .MuiFormControlLabel-root:focus, & > .MuiFormControlLabel-root:focus-visible, & > .MuiFormControlLabel-root:focus-within":
    {
      outline: "unset",
    },

  "& > .MuiFormControlLabel-root > span.MuiTypography-root:hover": {
    fontSize: "1.5em",
    fontWeight: "600",
  },

  "& > .MuiFormControlLabel-root:focus > span.MuiTypography-root": {
    fontSize: "1.5em",
    fontWeight: "600",
  },

  "& > .MuiFormControlLabel-root:focus-visible > span.MuiTypography-root": {
    fontSize: "1.5em",
    fontWeight: "600",
  },

  "& > .MuiFormControlLabel-root:focus-within > span.MuiTypography-root": {
    fontSize: "1.5em",
    fontWeight: "600",
  },
}));

const PickerItemWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <StyledSpan>{children}</StyledSpan>;
};

export default PickerItemWrapper;
