/** LIBRARIES */
import { styled } from "@mui/system";

export const StyledParagraph = styled("p")(({ theme }) => ({
    color: theme.palette.primary.main,
    fontFamily: "Parisienne, serif",
    webkitHyphens: "auto",
    mozHyphens: "auto",
    msHyphens: "auto",
    hyphens: "auto",
    margin: 0,
  }));
