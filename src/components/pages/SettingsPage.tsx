/** COMPONENTS */
import { SelectChangeEvent } from "@mui/material/Select";

/** CUSTOM COMPONENTS */
import ThemeColorPicker from "../other/ThemeColorPicker";
import SelectField from "../UI/SelectField";

/** LIBRARIES */
import { useSelector } from "react-redux";

/** MODELS */
import { WordsPerPage } from "../../models/common";
import APP_CONTENT from "../../models/constants";
import { Label } from "../../models/link";

/** OTHER */
import { RootState, useAppDispatch } from "../../store";
import { favoriteActions } from "../../store/favorite";
import { searchedActions } from "../../store/searched";

/** STYLED COMPONENTS */
import { StyledTypography } from "../styled/StyledTypography";

const TEXT_CONTENT = APP_CONTENT.SELECTFIELD.LABEL;

const SettingsPage = () => {
  const appDispatch = useAppDispatch();
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

  return (
    <>
      <StyledTypography component="h2">{Label.SETTINGS}</StyledTypography>
      <SelectField
        id="searched-per-page"
        label={TEXT_CONTENT.SEARCHED}
        labelId="searched-per-page-label"
        onChange={searchedSelectChangeHandler}
        value={searchedRecordsPerPage}
      />
      <SelectField
        id="favorite-per-page"
        label={TEXT_CONTENT.FAVORITE}
        labelId="favorite-per-page-label"
        onChange={favoriteSelectChangeHandler}
        value={favoriteRecordsPerPage}
      />
      <ThemeColorPicker />
    </>
  );
};

export default SettingsPage;
