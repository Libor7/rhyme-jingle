/** COMPONENTS */
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

/** MODELS */
import { WordsPerPage } from "models/common";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: "1em 0.75em",
  minWidth: "80%",

  "& > .MuiInputBase-root": {
    color: theme.palette.primary.main,
    fontSize: "1.25em",
  },

  "& > .MuiInputBase-root > .MuiSvgIcon-root": {
    color: theme.palette.primary.main,
  },

  "& > .MuiInputBase-root > fieldset": {
    border: `1px solid ${theme.palette.primary.main}`,
  }
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1.25em",
}));

interface SelectFieldProps {
  id: string;
  label: string;
  labelId: string;
  onChange: (event: SelectChangeEvent<WordsPerPage>) => void;
  value: WordsPerPage;
}

const SelectField: FC<SelectFieldProps> = ({
  label,
  labelId,
  ...restProps
}) => {
  return (
    <StyledFormControl>
      <StyledInputLabel id={labelId}>{label}</StyledInputLabel>
      <Select
        labelId={labelId}
        label={label}
        {...restProps}
      >
        {Object.values(WordsPerPage)
          .filter((val) => typeof val !== "string")
          .map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
      </Select>
    </StyledFormControl>
  );
};

export default SelectField;
