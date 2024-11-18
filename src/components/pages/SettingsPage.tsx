/** COMPONENTS */
import { type SelectChangeEvent } from "@mui/material/Select";

/** CUSTOM COMPONENTS */
import AccordionWrapper from "components/layout/wrappers/AccordionWrapper";
import ArchivedAmountPicker from "components/other/ArchivedAmountPicker";
import ThemeColorPicker from "components/other/ThemeColorPicker";
import SelectField from "components/UI/SelectField";

/** LIBRARIES */
import { useSelector } from "react-redux";

/** MODELS */
import { WordsPerPage } from "models/common";
import APP_CONTENT from "models/constants";
import { Label } from "models/link";

/** OTHER */
import { type RootState, useAppDispatch } from "store";
import { archivedActions } from "store/archived";
import { favoriteActions } from "store/favorite";
import { searchedActions } from "store/searched";

/** STYLED COMPONENTS */
import { StyledTypography } from "components/styled/StyledTypography";

const SELECT = APP_CONTENT.SELECTFIELD;
const COLOR_PICKER = APP_CONTENT.PICKER.THEME_COLOR;

const SettingsPage = () => {
  const appDispatch = useAppDispatch();
  const { recordsPerPage: archivedPerPage } = useSelector(
    ({ archived }: RootState) => archived
  );
  const { recordsPerPage: searchedPerPage } = useSelector(
    ({ searched }: RootState) => searched
  );
  const { recordsPerPage: favoritesPerPage } = useSelector(
    ({ favorite }: RootState) => favorite
  );

  const searchedSelectChangeHandler = ({
    target,
  }: SelectChangeEvent<WordsPerPage>) =>
    appDispatch(
      searchedActions.setRecordsPerPage(target.value as WordsPerPage)
    );

  const favoriteSelectChangeHandler = ({
    target,
  }: SelectChangeEvent<WordsPerPage>) =>
    appDispatch(
      favoriteActions.setRecordsPerPage(target.value as WordsPerPage)
    );

  const archivedSelectChangeHandler = ({
    target,
  }: SelectChangeEvent<WordsPerPage>) =>
    appDispatch(
      archivedActions.setRecordsPerPage(target.value as WordsPerPage)
    );

  return (
    <>
      <StyledTypography component="h2">{Label.SETTINGS}</StyledTypography>
      <SelectField
        id={SELECT.SEARCHED.ID + "-per-page"}
        label={SELECT.SEARCHED.LABEL}
        labelId={SELECT.SEARCHED.ID + "-per-page-label"}
        onChange={searchedSelectChangeHandler}
        value={searchedPerPage}
      />
      <SelectField
        id={SELECT.FAVORITE.ID + "-per-page"}
        label={SELECT.FAVORITE.LABEL}
        labelId={SELECT.FAVORITE.ID + "-per-page-label"}
        onChange={favoriteSelectChangeHandler}
        value={favoritesPerPage}
      />
      <SelectField
        id={SELECT.ARCHIVED.ID + "-per-page"}
        label={SELECT.ARCHIVED.LABEL}
        labelId={SELECT.ARCHIVED.ID + "-per-page-label"}
        onChange={archivedSelectChangeHandler}
        value={archivedPerPage}
      />
      <ArchivedAmountPicker />
      <AccordionWrapper label={COLOR_PICKER.TITLE}>
        <ThemeColorPicker />
      </AccordionWrapper>
    </>
  );
};

export default SettingsPage;
