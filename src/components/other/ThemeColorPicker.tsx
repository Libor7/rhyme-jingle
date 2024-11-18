/** COMPONENTS */
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

/** CUSTOM COMPONENTS */
import PickerItemWrapper from "components/layout/wrappers/PickerItemWrapper";

/** LIBRARIES */
import { type ChangeEvent } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import APP_CONTENT from "models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "store";
import { settingsActions } from "store/settings";

/** STYLED COMPONENTS */
import { StyledPicker } from "components/styled/StyledPicker";

const TEXT_CONTENT = APP_CONTENT.PICKER.THEME_COLOR;

const ThemeColorPicker = () => {
  const appDispatch = useAppDispatch();
  const { colorPalette } = useSelector(({ settings }: RootState) => settings);

  const colorPaletteChangeHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    appDispatch(settingsActions.setColorPalette(target.value));
  };

  const colorPaletteKeyHandler = (key: string, val: string) => {
    key === "Enter" && appDispatch(settingsActions.setColorPalette(val));
  };

  return (
    <StyledPicker>
      <FormLabel id="color-palette-picker-label">
        {TEXT_CONTENT.TITLE}
      </FormLabel>
      <RadioGroup
        aria-labelledby="Color palette picker"
        value={colorPalette}
        onChange={colorPaletteChangeHandler}
      >
        {Object.values(TEXT_CONTENT.CONTROLS).map(({ LABEL, VALUE }) => (
          <PickerItemWrapper key={VALUE}>
            <FormControlLabel
              control={<Radio />}
              label={LABEL}
              onKeyDown={({ key }) => colorPaletteKeyHandler(key, VALUE)}
              tabIndex={VALUE !== colorPalette ? 0 : undefined}
              value={VALUE}
            />
          </PickerItemWrapper>
        ))}
      </RadioGroup>
    </StyledPicker>
  );
};

export default ThemeColorPicker;
