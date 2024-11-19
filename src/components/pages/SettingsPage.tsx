/** COMPONENTS */
import { type SelectChangeEvent } from "@mui/material/Select";

/** CUSTOM COMPONENTS */
import AccordionWrapper from "components/layout/wrappers/AccordionWrapper";
import ArchivedAmountPicker from "components/other/ArchivedAmountPicker";
import FlexboxWrapper from "components/layout/wrappers/FlexboxWrapper";
import ThemeColorPicker from "components/other/ThemeColorPicker";
import SelectField from "components/UI/SelectField";

/** HOOKS */
import useWindowSize from "hooks/useWindowSize";

/** LIBRARIES */
import { useCallback, useMemo } from "react";
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

interface ISelectField {
  id: string;
  label: string;
  changeHandler: (val: WordsPerPage) => void;
  value: WordsPerPage;
}

const SELECT = APP_CONTENT.SELECTFIELD;
const COLOR_PICKER = APP_CONTENT.PICKER.THEME_COLOR;

const SettingsPage = () => {
  const appDispatch = useAppDispatch();
  const { isExtraSmall, isSmall } = useWindowSize();
  const { recordsPerPage: archivedPerPage } = useSelector(
    ({ archived }: RootState) => archived
  );
  const { recordsPerPage: searchedPerPage } = useSelector(
    ({ searched }: RootState) => searched
  );
  const { recordsPerPage: favoritesPerPage } = useSelector(
    ({ favorite }: RootState) => favorite
  );

  const searchedHandler = useCallback(
    (val: WordsPerPage) => appDispatch(searchedActions.setRecordsPerPage(val)),
    [appDispatch]
  );

  const favoriteHandler = useCallback(
    (val: WordsPerPage) => appDispatch(favoriteActions.setRecordsPerPage(val)),
    [appDispatch]
  );

  const archivedHandler = useCallback(
    (val: WordsPerPage) => appDispatch(archivedActions.setRecordsPerPage(val)),
    [appDispatch]
  );

  const selectFields: ISelectField[] = useMemo(
    () => [
      {
        id: SELECT.SEARCHED.ID,
        label: SELECT.SEARCHED.LABEL,
        changeHandler: searchedHandler,
        value: searchedPerPage,
      },
      {
        id: SELECT.FAVORITE.ID,
        label: SELECT.FAVORITE.LABEL,
        changeHandler: favoriteHandler,
        value: favoritesPerPage,
      },
      {
        id: SELECT.ARCHIVED.ID,
        label: SELECT.ARCHIVED.LABEL,
        changeHandler: archivedHandler,
        value: archivedPerPage,
      },
    ],
    [
      archivedPerPage,
      archivedHandler,
      favoriteHandler,
      favoritesPerPage,
      searchedPerPage,
      searchedHandler,
    ]
  );

  return (
    <>
      <StyledTypography component="h2">{Label.SETTINGS}</StyledTypography>
      {selectFields.map(({ changeHandler, id, label, value }) => (
        <SelectField
          id={id + "-per-page"}
          key={id}
          label={label}
          labelId={id + "-per-page-label"}
          onChange={({ target }: SelectChangeEvent<WordsPerPage>) =>
            changeHandler(target.value as WordsPerPage)
          }
          value={value}
        />
      ))}
      <FlexboxWrapper column>
        <ArchivedAmountPicker />
        {isExtraSmall || isSmall ? (
          <AccordionWrapper label={COLOR_PICKER.TITLE}>
            <ThemeColorPicker />
          </AccordionWrapper>
        ) : (
          <ThemeColorPicker />
        )}
      </FlexboxWrapper>
    </>
  );
};

export default SettingsPage;
