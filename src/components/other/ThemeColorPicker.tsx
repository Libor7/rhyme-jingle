/** COMPONENTS */
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

/** LIBRARIES */
import { styled } from "@mui/system";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import APP_CONTENT from "../../models/constants";

/** OTHER */
import { RootState, useAppDispatch } from "../../store";
import { settingsActions } from "../../store/settings";

const TEXT_CONTENT = APP_CONTENT.THEME_COLOR_PICKER;

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: "1em",

  "& > .MuiFormLabel-root": {
    color: theme.palette.primary.main,
    marginBottom: "1em",
  },

  "& > .MuiFormLabel-root:focus, & > .MuiFormLabel-root:focus-visible, & > .MuiFormLabel-root:focus-within":
    {
      outline: "unset",
    },

  "& span.MuiButtonBase-root.MuiRadio-root": {
    color: theme.palette.primary.main,
  },
}));

const ThemeColorPicker = () => {
  const appDispatch = useAppDispatch();
  const { colorPalette } = useSelector((state: RootState) => state.settings);

  const colorPaletteChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    appDispatch(settingsActions.setColorPalette(event.target.value));
  };

  return (
    <StyledFormControl>
      <FormLabel id="color-palette-picker-label">
        {TEXT_CONTENT.TITLE}
      </FormLabel>
      <RadioGroup
        aria-labelledby="Color palette picker"
        value={colorPalette}
        onChange={colorPaletteChangeHandler}
      >
        {Object.values(TEXT_CONTENT.CONTROLS).map(({ LABEL, VALUE }) => (
          <FormControlLabel
            control={<Radio />}
            key={VALUE}
            label={LABEL}
            value={VALUE}
          />
        ))}
      </RadioGroup>
    </StyledFormControl>
  );
};

export default ThemeColorPicker;
