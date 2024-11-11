/** COMPONENTS */
import { SelectChangeEvent } from "@mui/material/Select";

/** CUSTOM COMPONENTS */
import ThemeColorPicker from "components/other/ThemeColorPicker";
import SelectField from "components/UI/SelectField";

/** LIBRARIES */
import { useSelector } from "react-redux";

/** MODELS */
import { WordsPerPage } from "models/common";
import APP_CONTENT from "models/constants";
import { Label } from "models/link";

/** OTHER */
import { RootState, useAppDispatch } from "store";
import { favoriteActions } from "store/favorite";
import { searchedActions } from "store/searched";

/** STYLED COMPONENTS */
import { StyledTypography } from "components/styled/StyledTypography";
import { archivedActions } from "store/archived";

const TEXT_CONTENT = APP_CONTENT.SELECTFIELD;

const SettingsPage = () => {
  const appDispatch = useAppDispatch();
  const { recordsPerPage: archivedRecordsPerPage } = useSelector(
    (state: RootState) => state.archived
  );
  const { recordsPerPage: searchedRecordsPerPage } = useSelector(
    (state: RootState) => state.searched
  );
  const { recordsPerPage: favoriteRecordsPerPage } = useSelector(
    (state: RootState) => state.favorite
  );

  const searchedSelectChangeHandler = (
    event: SelectChangeEvent<WordsPerPage>
  ) =>
    appDispatch(
      searchedActions.setRecordsPerPage(event.target.value as WordsPerPage)
    );

  const favoriteSelectChangeHandler = (
    event: SelectChangeEvent<WordsPerPage>
  ) =>
    appDispatch(
      favoriteActions.setRecordsPerPage(event.target.value as WordsPerPage)
    );

  const archivedSelectChangeHandler = (
    event: SelectChangeEvent<WordsPerPage>
  ) =>
    appDispatch(
      archivedActions.setRecordsPerPage(event.target.value as WordsPerPage)
    );

  return (
    <>
      <StyledTypography component="h2">{Label.SETTINGS}</StyledTypography>
      <SelectField
        id={TEXT_CONTENT.SEARCHED.ID + "-per-page"}
        label={TEXT_CONTENT.SEARCHED.LABEL}
        labelId={TEXT_CONTENT.SEARCHED.ID + "-per-page-label"}
        onChange={searchedSelectChangeHandler}
        value={searchedRecordsPerPage}
      />
      <SelectField
        id={TEXT_CONTENT.FAVORITE.ID + "-per-page"}
        label={TEXT_CONTENT.FAVORITE.LABEL}
        labelId={TEXT_CONTENT.FAVORITE.ID + "-per-page-label"}
        onChange={favoriteSelectChangeHandler}
        value={favoriteRecordsPerPage}
      />
      <SelectField
        id={TEXT_CONTENT.ARCHIVED.ID + "-per-page"}
        label={TEXT_CONTENT.ARCHIVED.LABEL}
        labelId={TEXT_CONTENT.ARCHIVED.ID + "-per-page-label"}
        onChange={archivedSelectChangeHandler}
        value={archivedRecordsPerPage}
      />
      <ThemeColorPicker />
    </>
  );
};

export default SettingsPage;
