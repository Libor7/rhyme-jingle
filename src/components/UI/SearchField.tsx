/** COMPONENTS */
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

/** ICONS */
import ClearIcon from "@mui/icons-material/Clear";

/** LIBRARIES */
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { type DisplayType } from "models/common";
import { Input } from "models/input";

/** OTHER */
import { type RootState } from "store/index";

const StyledTextField = styled(TextField)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  outline: "unset",

  [theme.breakpoints.up("lg")]: {
    width: "60%",
  },

  "& .MuiInputBase-root:focus, & .MuiInputBase-root:focus-visible, & .MuiInputBase-root:focus-within":
    {
      outline: "unset",
    },

  "& .MuiInputBase-root:before": {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
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
  const { searchedText } = useSelector(({ searched }: RootState) => searched);
  const { palette } = useTheme();
  const [showClearIcon, setShowClearIcon] = useState<DisplayType>("none");

  useEffect(() => {
    searchedText.length > 0 && setShowClearIcon("flex");
  }, [searchedText.length]);

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
              color: palette.primary.main,
              cursor: "pointer",
              display: showClearIcon,
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
