/** COMPONENTS */
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Paper, { type PaperProps } from "@mui/material/Paper";

/** ICONS */
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC, useCallback } from "react";
import { useLocation } from "react-router-dom";

/** MODELS */
import { type IDialogContent } from "components/other/AdditionalControls";

/** OTHER */
import { useAppDispatch } from "store";
import { favoriteActions } from "store/favorite";

/** STYLED COMPONENTS */
import { StyledDialogTitle } from "components/styled/StyledDialogTitle";
import { StyledDialogContent } from "components/styled/StyledDialogContent";
import { StyledDialogActions } from "components/styled/StyledDialogActions";
import { archivedActions } from "store/archived";

const StyledParagraph = styled("p")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: "Parisienne, serif",
  webkitHyphens: "auto",
  mozHyphens: "auto",
  msHyphens: "auto",
  hyphens: "auto",
  margin: 0,
}));

const PaperComponent = (props: PaperProps) => {
  return <Paper {...props} />;
};

interface IAdditionalControlsDialogProps {
  dialogText: IDialogContent;
  onCheckboxClose: () => void;
  onDialogClose: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  open: boolean;
}

const AdditionalControlsDialog: FC<IAdditionalControlsDialogProps> = ({
  dialogText,
  onCheckboxClose,
  onDialogClose,
  open,
}) => {
  const appDispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isFavoritePage = pathname === "/favorite";

  const deleteHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      isFavoritePage
        ? appDispatch(favoriteActions.setFavorites([]))
        : appDispatch(archivedActions.setArchived([]));
      onCheckboxClose();
      onDialogClose(event);
    },
    [appDispatch, isFavoritePage, onCheckboxClose, onDialogClose]
  );

  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="items-deletion-dialog-title"
    >
      <StyledDialogTitle id="items-deletion-dialog-title">
        {dialogText.title}
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledParagraph>{dialogText.description}</StyledParagraph>
      </StyledDialogContent>
      <StyledDialogActions>
        <IconButton
          aria-label="reset"
          disableRipple
          onClick={onDialogClose}
          role="button"
          size="large"
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="reset"
          disableRipple
          onClick={deleteHandler}
          role="button"
          size="large"
        >
          <CheckIcon fontSize="inherit" />
        </IconButton>
      </StyledDialogActions>
    </Dialog>
  );
};

export default AdditionalControlsDialog;
