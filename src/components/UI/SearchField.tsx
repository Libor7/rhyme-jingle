/** COMPONENTS */
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

/** ICONS */
import ClearIcon from "@mui/icons-material/Clear";

/** LIBRARIES */
import { styled } from "@mui/system";
import { ChangeEvent, useCallback, useState } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { DisplayType } from "../../models/common";
import APP_CONTENT from "../../models/constants";
import { Input } from "../../models/input";

/** OTHER */
import { searchedActions } from "../../store/searched";
import { RootState, useAppDispatch } from "../../store";

const StyledTextField = styled(TextField)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  outline: "unset",

  "& .MuiInputBase-root:focus, & .MuiInputBase-root:focus-visible, & .MuiInputBase-root:focus-within":
    {
      outline: "unset",
    },

  "& .MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error):before": {
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
  },

  "& .MuiInputBase-input.MuiInput-input": {
    color: theme.palette.primary.main,
    fontSize: "1.5em",
    padding: "0.5em",
  },

  "& .MuiInputBase-input.MuiInput-input:focus, & .MuiInputBase-input.MuiInput-input:focus-visible, & .MuiInputBase-input.MuiInput-input:focus-within":
    {
      color: theme.palette.primary.dark,
      outline: "unset",
    },

  "& .MuiInputBase-input::-webkit-search-decoration, & .MuiInputBase-input::-webkit-search-cancel-button, & .MuiInputBase-input::-webkit-search-results-button, & .MuiInputBase-input::-webkit-search-results-decoration":
    {
      display: "none",
      height: 0,
      width: 0,
      webkitAppearance: "none",
    },

  "& .MuiInputBase-input::-ms-clear, & .MuiInputBase-input::-ms-reveal": {
    display: "none",
    height: 0,
    width: 0,
    webkitAppearance: "none",
  },
}));

const SearchField = () => {
  const { searchedText } = useSelector((state: RootState) => state.searched);
  const appDispatch = useAppDispatch();
  const [showClearIcon, setShowClearIcon] = useState<DisplayType>("none");

  const searchedTextChangeHandler = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    setShowClearIcon(currentTarget.value === "" ? "none" : "flex");
    appDispatch(searchedActions.setSearchedText(currentTarget.value));
  };

  const searchedTextClearHandler = useCallback(
    () => {
      setShowClearIcon("none");
      appDispatch(searchedActions.setSearchedText(""));
    },
    [appDispatch]
  );

  return (
    <StyledTextField
      autoFocus
      id="search-all"
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{ display: showClearIcon, cursor: "pointer" }}
            onClick={searchedTextClearHandler}
          >
            <ClearIcon />
          </InputAdornment>
        ),
      }}
      onChange={searchedTextChangeHandler}
      placeholder={APP_CONTENT.SEARCHFIELD.PLACEHOLDER.SEARCHED}
      type={Input.SEARCH}
      value={searchedText}
      variant="standard"
    />
  );
};

export default SearchField;
