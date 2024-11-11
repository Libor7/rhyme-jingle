/** COMPONENTS */
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

/** ICONS */
import ClearIcon from "@mui/icons-material/Clear";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type ChangeEvent, type FC, useCallback, useState } from "react";

/** MODELS */
import { type DisplayType } from "models/common";
import { Input } from "models/input";

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

interface ISearchFieldProps {
  id: string;
  placeholder: string;
  setValue: (value: string) => void;
  value: string;
}

const SearchField: FC<ISearchFieldProps> = ({ setValue, ...restProps }) => {
  const [showClearIcon, setShowClearIcon] = useState<DisplayType>("none");

  const changeHandler = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      setShowClearIcon(currentTarget.value === "" ? "none" : "flex");
      setValue(currentTarget.value);
    },
    [setValue]
  );

  const clearHandler = useCallback(() => {
    setShowClearIcon("none");
    setValue("");
  }, [setValue]);

  return (
    <StyledTextField
      autoFocus
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{
              display: showClearIcon,
              cursor: "pointer",
              marginRight: "0.5em",
            }}
            onClick={clearHandler}
          >
            <ClearIcon />
          </InputAdornment>
        ),
      }}
      onChange={changeHandler}
      type={Input.SEARCH}
      variant="standard"
      {...restProps}
    />
  );
};

export default SearchField;
