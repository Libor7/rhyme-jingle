/** CUSTOM COMPONENTS */
import Modal from "../../UI/dialog/modal/Modal";
import PaginationDialog from "../../UI/dialog/dialog-content/pagination-dialog/PaginationDialog";

/** ICONS */
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ReplayIcon from "@mui/icons-material/Replay";
import StarBorderIcon from "@mui/icons-material/StarBorder";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";

/** OTHER */
import { favoriteActions } from "../../../store/favorite";
import { searchedActions } from "../../../store/searched";
import { RootState, useAppDispatch } from "../../../store";

/** STYLED COMPONENTS */
import { StyledIconButton } from "../../styled/StyledIconButton";

const StyledSection = styled("section")(() => ({
  alignItems: "flex-end",
  display: "flex",
  flexDirection: "column",
  gap: "0.25em",
}));

interface MiscellaneousControlsProps {
  hasPagination: boolean;
  totalWordsFound: number;
}

const MiscellaneousControls: FC<MiscellaneousControlsProps> = ({
  hasPagination,
  totalWordsFound,
}) => {
  const { candidates } = useSelector((state: RootState) => state.favorite);
  const appDispatch = useAppDispatch();
  const [pageModalShown, setPageModalShown] = useState<boolean>(false);

  const hasCandidates = candidates.length > 0;

  const resetWordsFound = useCallback(() => {
    appDispatch(searchedActions.setPropertyToInitialValue("lengthFilters"));
    appDispatch(searchedActions.setPropertyToInitialValue("removedWords"));
    appDispatch(favoriteActions.setPropertyToInitialValue("candidates"));
  }, [appDispatch]);

  const togglePageModal = useCallback(
    () => setPageModalShown((prevState) => !prevState),
    []
  );

  const enterKeyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) =>
      event.key === "Enter" && togglePageModal(),
    [togglePageModal]
  );

  return (
    <StyledSection>
      {totalWordsFound > 0 && (
        <StyledIconButton
          aria-label="reset"
          disableRipple
          onClick={resetWordsFound}
        >
          <ReplayIcon fontSize="inherit" />
        </StyledIconButton>
      )}
      {hasCandidates && (
        <StyledIconButton aria-label="reset" disableRipple>
          <StarBorderIcon fontSize="inherit" />
        </StyledIconButton>
      )}
      {hasPagination && (
        <StyledIconButton
          aria-label="reset"
          disableRipple
          onClick={togglePageModal}
          onKeyDown={enterKeyHandler}
        >
          <AutoStoriesIcon fontSize="inherit" />
        </StyledIconButton>
      )}
      {pageModalShown && (
        <Modal>
          <PaginationDialog open={pageModalShown} onDialogClose={togglePageModal} />
        </Modal>
      )}
    </StyledSection>
  );
};

export default MiscellaneousControls;
