/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC, type PropsWithChildren } from "react";

interface StyledSectionProps {
  column?: boolean;
}

const StyledSection = styled("section")<StyledSectionProps>(
  ({ theme, column }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "1em 0",

    [theme.breakpoints.up("sm")]: {
      flexDirection: column ? "column" : "row",
    },

    [theme.breakpoints.up("lg")]: {
      justifyContent: "start",
    },
  })
);

interface FlexboxWrapperProps {
  column?: boolean;
}

const FlexboxWrapper: FC<PropsWithChildren<FlexboxWrapperProps>> = ({
  children,
  ...otherProps
}) => {
  return <StyledSection {...otherProps}>{children}</StyledSection>;
};

export default FlexboxWrapper;
