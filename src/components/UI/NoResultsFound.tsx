/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC } from "react";

const StyledDiv = styled("div")(({ theme }) => ({
  alignItems: "center",
  color: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  justifyContent: "center",
  margin: "10% auto",
  width: "80%",

  [theme.breakpoints.up("sm")]: {
    textAlign: "justify",
  },
}));

interface INoResultsFoundProps {
  heading: string;
  text: string;
}

const NoResultsFound: FC<INoResultsFoundProps> = ({ heading, text }) => {
  return (
    <StyledDiv>
      <h2>{heading}</h2>
      <p>{text}</p>
    </StyledDiv>
  );
};

export default NoResultsFound;
