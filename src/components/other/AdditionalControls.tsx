/** COMPONENTS */
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

/** CUSTOM COMPONENTS */
import InfoDialog from "components/UI/dialog/dialog-content/InfoDialog";
import Modal from "components/UI/dialog/Modal";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

/** ICONS */
import DeleteIcon from "@mui/icons-material/Delete";

/** MODELS */
import APP_CONTENT from "models/constants";

/** OTHER */
import { archivedActions } from "store/archived";
import { favoriteActions } from "store/favorite";
import { useAppDispatch } from "store";

/** STYLED COMPONENTS */
import { StyledIconButton } from "components/styled/StyledIconButton";

const StyledSection = styled("section")(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginTop: "1em",
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

export interface IDialogContent {
  title: string;
  text: string;
}

interface IAdditionalControlsProps {
  count: number;
  dialogContent: IDialogContent;
}

const AdditionalControls: FC<IAdditionalControlsProps> = ({
  count,
  dialogContent,
}) => {
  const appDispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [checked, setChecked] = useState<boolean>(false);
  const [modalShown, setModalShown] = useState<boolean>(false);

  const isFavoritePage = pathname === "/favorite";

  const checkboxChangeHandler = useCallback(
    () => setChecked((prevState) => !prevState),
    []
  );

  const toggleModal = useCallback(() => {
    setModalShown((prevState) => !prevState);
  }, []);

  const confirmHandler = useCallback(() => {
    isFavoritePage
      ? appDispatch(favoriteActions.setFavorites([]))
      : appDispatch(archivedActions.setArchived([]));
    checkboxChangeHandler();
    toggleModal();
  }, [appDispatch, checkboxChangeHandler, isFavoritePage, toggleModal]);

  const toggleModalKeyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) =>
      event.key === "Enter" && toggleModal(),
    [toggleModal]
  );

  return (
    <>
      <StyledSection>
        {count > 0 && (
          <StyledFormControlLabel
            checked={checked}
            control={<Checkbox size="large" />}
            label={APP_CONTENT.CHECKBOXFIELD.LABEL}
            onChange={checkboxChangeHandler}
            onKeyDown={({ key }) => key === "Enter" && checkboxChangeHandler()}
          />
        )}
        {count > 0 && checked && (
          <StyledIconButton
            aria-label="remove all items"
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
          <InfoDialog
            onClose={toggleModal}
            onConfirm={() => confirmHandler()}
            open={modalShown}
            text={dialogContent.text}
            title={dialogContent.title}
          />
        </Modal>
      )}
    </>
  );
};

export default AdditionalControls;
