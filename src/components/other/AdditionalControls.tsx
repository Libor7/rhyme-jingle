/** COMPONENTS */
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

/** CUSTOM COMPONENTS */
import AdditionalControlsDialog from "components/UI/dialog/dialog-content/AdditionalControlsDialog";
import Modal from "components/UI/dialog/Modal";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC, useCallback, useState } from "react";

/** ICONS */
import DeleteIcon from "@mui/icons-material/Delete";

/** MODELS */
import APP_CONTENT from "models/constants";

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
  description: string;
}

interface IAdditionalControlsProps {
  count: number;
  dialogText: IDialogContent;
}

const AdditionalControls: FC<IAdditionalControlsProps> = ({
  count,
  dialogText,
}) => {
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
        {count > 0 && (
          <StyledFormControlLabel
            checked={checked}
            control={<Checkbox size="large" />}
            label={APP_CONTENT.CHECKBOXFIELD.LABEL}
            onChange={checkboxChangeHandler}
            onKeyDown={checkboxKeyHandler}
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
          <AdditionalControlsDialog
            dialogText={dialogText}
            open={modalShown}
            onCheckboxClose={checkboxChangeHandler}
            onDialogClose={toggleModal}
          />
        </Modal>
      )}
    </>
  );
};

export default AdditionalControls;
