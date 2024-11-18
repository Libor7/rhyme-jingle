/** CUSTOM COMPONENTS */
import Modal from "components/UI/dialog/Modal";
import PaginationDialog from "components/UI/dialog/dialog-content/PaginationDialog";

/** ICONS */
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ReplayIcon from "@mui/icons-material/Replay";
import StarBorderIcon from "@mui/icons-material/StarBorder";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";

/** OTHER */
import { favoriteActions } from "store/favorite";
import { searchedActions } from "store/searched";
import { type RootState, useAppDispatch } from "store";

/** STYLED COMPONENTS */
import { StyledIconButton } from "components/styled/StyledIconButton";

const StyledSection = styled("section")(() => ({
  alignItems: "flex-end",
  display: "flex",
  flexDirection: "column",
  gap: "0.25em",
}));

interface IMiscellaneousControlsProps {
  hasPagination: boolean;
  totalWordsFound: number;
}

const MiscellaneousControls: FC<IMiscellaneousControlsProps> = ({
  hasPagination,
  totalWordsFound,
}) => {
  const { candidates } = useSelector(({ favorite }: RootState) => favorite);
  const appDispatch = useAppDispatch();
  const [modalShown, setModalShown] = useState<boolean>(false);

  const hasCandidates = candidates.length > 0;

  const resetWordsFound = useCallback(
    ({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      appDispatch(searchedActions.setPropertyToInitialValue("lengthFilters"));
      appDispatch(searchedActions.setPropertyToInitialValue("removedWords"));
      appDispatch(favoriteActions.setPropertyToInitialValue("candidates"));
      currentTarget.blur();
    },
    [appDispatch]
  );

  const toggleModal = useCallback(
    ({
      currentTarget,
    }:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLButtonElement>) => {
      setModalShown((prevState) => !prevState);
      currentTarget.blur();
    },
    []
  );

  const toggleModalKeyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) =>
      event.key === "Enter" && toggleModal(event),
    [toggleModal]
  );

  const addToFavoritesKeyHandler = ({
    key,
  }: React.KeyboardEvent<HTMLButtonElement>) =>
    key === "Enter" && addToFavorites();

  const addToFavorites = () => {
    appDispatch(favoriteActions.addFavorites());
    appDispatch(favoriteActions.setPropertyToInitialValue("candidates"));
  };

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
        <StyledIconButton
          aria-label="add favorites"
          disableRipple
          onClick={addToFavorites}
          onKeyDown={addToFavoritesKeyHandler}
        >
          <StarBorderIcon fontSize="inherit" />
        </StyledIconButton>
      )}
      {hasPagination && (
        <StyledIconButton
          aria-label="switch pagination"
          disableRipple
          onClick={toggleModal}
          onKeyDown={toggleModalKeyHandler}
        >
          <AutoStoriesIcon fontSize="inherit" />
        </StyledIconButton>
      )}
      {modalShown && (
        <Modal>
          <PaginationDialog open={modalShown} onDialogClose={toggleModal} />
        </Modal>
      )}
    </StyledSection>
  );
};

export default MiscellaneousControls;
