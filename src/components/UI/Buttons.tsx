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
  hasPagination: boolean;
  lengths: number[];
  totalWordsFound: number;
}

const Buttons: FC<IButtonsProps> = ({
  disposableWords,
  hasPagination,
  lengths,
  totalWordsFound,
}) => {
  return (
    <StyledSection>
      {lengths.length > 0 && disposableWords.length > 0 && (
        <FilterControls disposableWords={disposableWords} lengths={lengths} />
      )}
      <MiscellaneousControls
        totalWordsFound={totalWordsFound}
        hasPagination={hasPagination}
      />
    </StyledSection>
  );
};

export default Buttons;
