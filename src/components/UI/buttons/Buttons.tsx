/** COMPONENTS */
import FilterControls from "../../other/filter-controls/FilterControls";
import MiscellaneousControls from "../../other/miscellaneous-controls/MiscellaneousControls";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

const StyledSection = styled("section")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

interface ButtonsProps {
  disposableWords: string[];
  hasPagination: boolean;
  lengths: number[];
  totalWordsFound: number;
}

const Buttons: FC<ButtonsProps> = ({
  disposableWords,
  hasPagination,
  lengths,
  totalWordsFound,
}) => {
  return (
    <StyledSection>
      <FilterControls disposableWords={disposableWords} lengths={lengths} />
      <MiscellaneousControls
        totalWordsFound={totalWordsFound}
        hasPagination={hasPagination}
      />
    </StyledSection>
  );
};

export default Buttons;
