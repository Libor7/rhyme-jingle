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
import { ArchivedAmount } from "models/common";
import APP_CONTENT from "models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "store";
import { archivedActions } from "store/archived";

/** STYLED COMPONENTS */
import { StyledPicker } from "components/styled/StyledPicker";

const ArchivedAmountPicker = () => {
  const appDispatch = useAppDispatch();
  const { archivedAmount } = useSelector((state: RootState) => state.archived);

  const archivedAmountChangeHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement>) =>
    appDispatch(
      archivedActions.setArchivedAmount(
        target.value as unknown as ArchivedAmount
      )
    );

  const archivedAmountKeyHandler = (key: string, val: ArchivedAmount) =>
    key === "Enter" && appDispatch(archivedActions.setArchivedAmount(val));

  return (
    <StyledPicker>
      <FormLabel id="color-palette-picker-label">
        {APP_CONTENT.PICKER.ARCHIVED_AMOUNT.LABEL}
      </FormLabel>
      <RadioGroup
        aria-labelledby="Color palette picker"
        onChange={archivedAmountChangeHandler}
        row
        value={archivedAmount}
      >
        {Object.values(ArchivedAmount)
          .filter((val) => typeof val !== "string")
          .map((val) => (
            <PickerItemWrapper key={val}>
              <FormControlLabel
                control={<Radio />}
                label={val}
                onKeyDown={({ key }) =>
                  archivedAmountKeyHandler(key, val as ArchivedAmount)
                }
                tabIndex={val !== archivedAmount ? 0 : undefined}
                value={val}
              />
            </PickerItemWrapper>
          ))}
      </RadioGroup>
    </StyledPicker>
  );
};

export default ArchivedAmountPicker;
