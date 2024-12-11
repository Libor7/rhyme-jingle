/** COMPONENTS */
import FilterControls from "components/other/FilterControls";
import MiscellaneousControls from "components/other/MiscellaneousControls";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC } from "react";

const StyledSection = styled("section")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

interface IButtonsProps {
  disposableWords: string[];
  lengths: number[];
}

const Buttons: FC<IButtonsProps> = ({ disposableWords, lengths }) => {
  return (
    <StyledSection>
      {lengths.length > 0 && disposableWords.length > 0 && (
        <FilterControls disposableWords={disposableWords} lengths={lengths} />
      )}
      <MiscellaneousControls />
    </StyledSection>
  );
};

export default Buttons;
