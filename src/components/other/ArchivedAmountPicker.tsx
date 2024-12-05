/** COMPONENTS */
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

/** CUSTOM COMPONENTS */
import InfoDialog from "components/UI/dialog/dialog-content/InfoDialog";
import PickerItemWrapper from "components/layout/wrappers/PickerItemWrapper";
import Modal from "components/UI/dialog/Modal";

/** LIBRARIES */
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { ArchivedAmount } from "models/common";
import APP_CONTENT from "models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "store";
import { archivedActions } from "store/archived";

/** STYLED COMPONENTS */
import { StyledPicker } from "components/styled/StyledPicker";

const DIALOG_CONTENT = APP_CONTENT.DIALOG.INFO.REDUCE_ARCHIVED;

const ArchivedAmountPicker = () => {
  const appDispatch = useAppDispatch();
  const { archivedAmount } = useSelector(({ archived }: RootState) => archived);
  const [modal, setModal] = useState<{
    isShown: boolean;
    newArchivedAmount?: number;
  }>({ isShown: false });

  const closeModal = useCallback(
    () => setModal((prevState) => ({ ...prevState, isShown: false })),
    []
  );

  const setArchivedAmount = useCallback(
    (val: ArchivedAmount) => {
      appDispatch(archivedActions.setArchivedAmount(val));
      closeModal();
    },
    [appDispatch, closeModal]
  );

  const changeArchivedAmount = useCallback(
    (val: ArchivedAmount) =>
      +val > +archivedAmount
        ? setArchivedAmount(val)
        : setModal({ isShown: true, newArchivedAmount: +val }),
    [archivedAmount, setArchivedAmount]
  );

  const archivedAmountKeyHandler = useCallback(
    (key: string, val: ArchivedAmount) =>
      key === "Enter" && changeArchivedAmount(val),
    [changeArchivedAmount]
  );

  return (
    <>
      <StyledPicker>
        <FormLabel id="color-palette-picker-label">
          {APP_CONTENT.PICKER.ARCHIVED_AMOUNT.LABEL}
        </FormLabel>
        <RadioGroup
          aria-labelledby="Color palette picker"
          onChange={({ target }) =>
            changeArchivedAmount(target.value as unknown as ArchivedAmount)
          }
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
      {modal.isShown && (
        <Modal>
          <InfoDialog
            onClose={closeModal}
            onConfirm={() => setArchivedAmount(modal.newArchivedAmount!)}
            open={modal.isShown}
            text={DIALOG_CONTENT.DESCRIPTION(
              modal.newArchivedAmount!,
              +archivedAmount
            )}
            title={DIALOG_CONTENT.TITLE}
          />
        </Modal>
      )}
    </>
  );
};

export default ArchivedAmountPicker;
