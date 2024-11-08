/** COMPONENTS */
import Typography from "@mui/material/Typography";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type ElementType, type FC } from "react";

const StyledTypography = styled(Typography)<IStyledTypographyProps>(
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

interface IWordCountProps {
  adjectives: [string, string];
  count: number;
}

interface IStyledTypographyProps {
  component: ElementType;
}

const WordCount: FC<IWordCountProps> = ({ adjectives, count }) => {
  const text = count < 1 || count > 4 ? adjectives[0] : adjectives[1];

  return (
    <StyledTypography component="h2">
      {count + " " + text}
    </StyledTypography>
  );
};

export default WordCount;
