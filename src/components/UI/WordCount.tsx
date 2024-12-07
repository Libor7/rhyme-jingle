/** LIBRARIES */
import { motion } from "framer-motion";
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
      <motion.span
        animate={{
          fontSize: ["1em", "1.5em", "1em"],
          lineHeight: ["1.5em", "1em", "1.5em"],
        }}
        transition={{ duration: 0.3 }}
      >
        {count}
      </motion.span>
      {` ${text}`}
    </StyledTypography>
  );
};

export default WordCount;
