/** COMPONENTS */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper, { PaperProps } from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

/** ICONS */
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

/** LIBRARIES */
import { styled } from "@mui/system";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import APP_CONTENT, { INITIAL_PAGE } from "../../../../../models/constants";

/** OTHER */
import { RootState, useAppDispatch } from "../../../../../store";
import { searchedActions } from "../../../../../store/searched";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.primary.main,
  fontWeight: 600,
  textAlign: "center",
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,

  "&:focus-visible": {
    outline: "unset",
  },

  "& > .MuiFormControl-root:focus-visible": {
    outline: "unset",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root:focus-visible": {
    outline: "unset",
    outlineOffset: "unset",
  },

  "& .MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error):before": {
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
  },

  "& .MuiInputBase-input": {
    borderBottomColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    fontWeight: 600,
    textAlign: "center",
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  padding: "0 1.5em 1em",

  "& > button.MuiButtonBase-root": {
    color: theme.palette.primary.main,
    flexGrow: 1,
  },
  "& > button.MuiButtonBase-root:focus, & > button.MuiButtonBase-root:focus-visible, & > button.MuiButtonBase-root:focus-within":
    {
      borderBottom: `2px solid ${theme.palette.primary.dark}`,
      color: theme.palette.primary.dark,
    },
}));

const PaperComponent = (props: PaperProps) => {
  return <Paper {...props} />;
};

interface PaginationDialogProps {
  onDialogClose: () => void;
  open: boolean;
}

const PaginationDialog: FC<PaginationDialogProps> = ({
  onDialogClose,
  open,
}) => {
  const { currentPage, pageCount } = useSelector(
    (state: RootState) => state.searched
  );
  const appDispatch = useAppDispatch();
  const [pageNum, setPageNum] = useState<number>(currentPage);

  const currentPageChangeHandler = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      const { value } = currentTarget;
      const newValue =
        +value < INITIAL_PAGE
          ? INITIAL_PAGE
          : +value > pageCount
          ? pageCount
          : +value;
      setPageNum(newValue);
    },
    [pageCount]
  );

  const savePageHandler = useCallback(() => {
    appDispatch(searchedActions.setCurrentPage(pageNum));
    onDialogClose();
  }, [appDispatch, onDialogClose, pageNum]);

  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="dialog-title"
    >
      <StyledDialogTitle id="dialog-title">
        {APP_CONTENT.DIALOG.TITLE}
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledTextField
          id="current-page"
          onChange={currentPageChangeHandler}
          type="number"
          value={pageNum}
          variant="standard"
        />
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
          onClick={savePageHandler}
          role="button"
          size="large"
        >
          <CheckIcon fontSize="inherit" />
        </IconButton>
      </StyledDialogActions>
    </Dialog>
  );
};

export default PaginationDialog;
