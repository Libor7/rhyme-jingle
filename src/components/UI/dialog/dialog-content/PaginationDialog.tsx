/** COMPONENTS */
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Paper, { type PaperProps } from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

/** ICONS */
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type ChangeEvent, type FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import APP_CONTENT, { INITIAL_PAGE } from "models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "store";
import { searchedActions } from "store/searched";

/** STYLED COMPONENTS */
import { StyledDialogTitle } from "components/styled/StyledDialogTitle";
import { StyledDialogContent } from "components/styled/StyledDialogContent";
import { StyledDialogActions } from "components/styled/StyledDialogActions";

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

  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    webkitAppearance: "none",
    mozAppearance: "none",
    appearance: "none",
    margin: 0,
  },
}));

const PaperComponent = (props: PaperProps) => {
  return <Paper {...props} />;
};

interface IPaginationDialogProps {
  onDialogClose: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  open: boolean;
}

const PaginationDialog: FC<IPaginationDialogProps> = ({
  onDialogClose,
  open,
}) => {
  const { currentPage, pageCount } = useSelector(
    ({ searched }: RootState) => searched
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

  const savePageHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      appDispatch(searchedActions.setCurrentPage(pageNum));
      onDialogClose(event);
    },
    [appDispatch, onDialogClose, pageNum]
  );

  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="searched-dialog-title"
    >
      <StyledDialogTitle id="searched-dialog-title">
        {APP_CONTENT.DIALOG.INFO.MOVE_TO_PAGE}
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
