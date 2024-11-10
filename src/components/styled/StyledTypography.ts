/** COMPONENTS */
import Typography from "@mui/material/Typography";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type ElementType } from "react";

interface IStyledTypographyProps {
    component: ElementType;
  }

export const StyledTypography = styled(Typography)<IStyledTypographyProps>(
  ({ theme }) => ({
    color: theme.palette.primary.main,
    fontFamily: "Parisienne",
    fontSize: "1.5em",
    margin: 0,
    padding: "0.5em",

    "&:not(:first-of-type)": {
      paddingTop: 0,
    },
  })
);
