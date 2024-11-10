/** COMPONENTS */
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Paper, { type PaperProps } from "@mui/material/Paper";

/** ICONS */
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC, useCallback } from "react";

/** OTHER */
import { useAppDispatch } from "../../../../store";
import { favoriteActions } from "../../../../store/favorite";
import APP_CONTENT from "../../../../models/constants";

/** STYLED COMPONENTS */
import { StyledDialogTitle } from "../../../styled/StyledDialogTitle";
import { StyledDialogContent } from "../../../styled/StyledDialogContent";
import { StyledDialogActions } from "../../../styled/StyledDialogActions";

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

interface IFavoriteDialogProps {
  onCheckboxClose: () => void;
  onDialogClose: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  open: boolean;
}

const FavoriteDialog: FC<IFavoriteDialogProps> = ({
  onCheckboxClose,
  onDialogClose,
  open,
}) => {
  const appDispatch = useAppDispatch();

  const deleteFavoritesHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      appDispatch(favoriteActions.setFavorites([]));
      onCheckboxClose();
      onDialogClose(event);
    },
    [appDispatch, onCheckboxClose, onDialogClose]
  );

  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="favorite-dialog-title"
    >
      <StyledDialogTitle id="favorite-dialog-title">
        {APP_CONTENT.DIALOG.FAVORITE.TITLE}
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledParagraph>
          {APP_CONTENT.DIALOG.FAVORITE.DESCRIPTION}
        </StyledParagraph>
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
          onClick={deleteFavoritesHandler}
          role="button"
          size="large"
        >
          <CheckIcon fontSize="inherit" />
        </IconButton>
      </StyledDialogActions>
    </Dialog>
  );
};

export default FavoriteDialog;
