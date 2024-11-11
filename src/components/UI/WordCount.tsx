/** LIBRARIES */
import { type FC } from "react";

/** STYLED COMPONENTS */
import { StyledTypography } from "components/styled/StyledTypography";

interface IWordCountProps {
  adjectives: [string, string];
  count: number;
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
