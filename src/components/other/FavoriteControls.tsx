/** COMPONENTS */
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

/** CUSTOM COMPONENTS */
import FavoriteDialog from "components/UI/dialog/dialog-content/FavoriteDialog";
import Modal from "components/UI/dialog/Modal";

/** LIBRARIES */
import { styled } from "@mui/system";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

/** ICONS */
import DeleteIcon from "@mui/icons-material/Delete";

/** MODELS */
import APP_CONTENT from "models/constants";

/** OTHER */
import { RootState } from "store";

/** STYLED COMPONENTS */
import { StyledIconButton } from "components/styled/StyledIconButton";

const StyledSection = styled("section")(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

const StyledFormControlLabel = styled(
  FormControlLabel
)<IStyledFormControlLabelProps>(({ theme, checked }) => ({
  color: theme.palette.primary.main,

  "&:focus, &:focus-visible, &:focus-within": {
    outline: "unset",
  },

  "& > .MuiButtonBase-root.MuiCheckbox-root": {
    backgroundColor: "unset",
    color: checked ? theme.palette.primary.main : theme.palette.primary.light,
  },

  "& > .MuiButtonBase-root.MuiCheckbox-root:hover": {
    color: checked ? theme.palette.primary.dark : theme.palette.primary.light,
  },

  "& > .MuiButtonBase-root.MuiCheckbox-root > *:hover": {
    outline: "unset",
    outlineOffset: "unset",
  },

  "& > .MuiButtonBase-root.MuiCheckbox-root:focus, & > .MuiButtonBase-root.MuiCheckbox-root:focus-visible, & > .MuiButtonBase-root.MuiCheckbox-root:focus-within,":
    {
      color: checked ? theme.palette.primary.dark : theme.palette.primary.light,
    },

  "& .MuiTouchRipple-root:focus, & .MuiTouchRipple-root:focus-visible, & .MuiTouchRipple-root:focus-within,":
    {
      outline: "unset",
    },
}));

interface IStyledFormControlLabelProps {
  checked: boolean;
}

const FavoriteControls = () => {
  const { favorites } = useSelector((state: RootState) => state.favorite);
  const [checked, setChecked] = useState<boolean>(false);
  const [modalShown, setModalShown] = useState<boolean>(false);

  const checkboxChangeHandler = useCallback(
    () => setChecked((prevState) => !prevState),
    []
  );

  const checkboxKeyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLLabelElement>) =>
      event.key === "Enter" && checkboxChangeHandler(),
    [checkboxChangeHandler]
  );

  const toggleModal = useCallback(
    (
      event:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      setModalShown((prevState) => !prevState);
      event.currentTarget.blur();
    },
    []
  );

  const toggleModalKeyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) =>
      event.key === "Enter" && toggleModal(event),
    [toggleModal]
  );

  return (
    <>
      <StyledSection>
        {favorites.length > 0 && (
          <StyledFormControlLabel
            checked={checked}
            control={<Checkbox size="large" />}
            label={APP_CONTENT.CHECKBOXFIELD.LABEL}
            onChange={checkboxChangeHandler}
            onKeyDown={checkboxKeyHandler}
          />
        )}
        {checked && (
          <StyledIconButton
            aria-label="remove all favorites"
            disableRipple
            onClick={toggleModal}
            onKeyDown={toggleModalKeyHandler}
          >
            <DeleteIcon fontSize="inherit" />
          </StyledIconButton>
        )}
      </StyledSection>
      {modalShown && (
        <Modal>
          <FavoriteDialog
            open={modalShown}
            onCheckboxClose={checkboxChangeHandler}
            onDialogClose={toggleModal}
          />
        </Modal>
      )}
    </>
  );
};

export default FavoriteControls;
