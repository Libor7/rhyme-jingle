/** COMPONENTS */
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

/** CUSTOM COMPONENTS */
import PickerItemWrapper from "components/layout/wrappers/PickerItemWrapper";

/** HOOKS */
import useWindowSize from "hooks/useWindowSize";

/** LIBRARIES */
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
  const { isExtraSmall, isSmall } = useWindowSize();
  const { colorPalette } = useSelector(({ settings }: RootState) => settings);

  const isLargeDevice = !(isExtraSmall || isSmall);

  return (
    <StyledPicker>
      {isLargeDevice && (
        <FormLabel id="color-palette-picker-label">
          {TEXT_CONTENT.TITLE}
        </FormLabel>
      )}
      <RadioGroup
        row={isLargeDevice}
        aria-labelledby="Color palette picker"
        value={colorPalette}
        onChange={({ target }) =>
          appDispatch(settingsActions.setColorPalette(target.value))
        }
      >
        {Object.values(TEXT_CONTENT.CONTROLS).map(({ LABEL, VALUE }) => (
          <PickerItemWrapper key={VALUE}>
            <FormControlLabel
              control={<Radio />}
              label={LABEL}
              onKeyDown={({ key }) =>
                key === "Enter" &&
                appDispatch(settingsActions.setColorPalette(VALUE))
              }
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
