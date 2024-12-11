/** LIBRARIES */
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { INITIAL_PAGE, MINIMAL_STRING_LENGTH_OTHER } from "models/constants";

/** OTHER */
import { filterByText, getCurrentPageWords } from "helpers/utils";
import { type RootState, useAppDispatch } from "store";
import { archivedActions } from "store/archived";

const useArchive = () => {
  const appDispatch = useAppDispatch();
  const { archived, currentPage, recordsPerPage, searchedText } = useSelector(
    ({ archived }: RootState) => archived
  );

  useEffect(() => {
    appDispatch(archivedActions.setCurrentPage(INITIAL_PAGE));
  }, [appDispatch, searchedText]);

  const archivedFilteredByText = useMemo(
    () => filterByText(archived, searchedText, MINIMAL_STRING_LENGTH_OTHER),
    [archived, searchedText]
  );

  const archivedWords =
    searchedText.length > 0 ? archivedFilteredByText : archived;
  const wordCount = archivedWords.length;

  const fromIndex = useMemo(
    () => recordsPerPage * currentPage - recordsPerPage,
    [currentPage, recordsPerPage]
  );

  const wordsToShow = useMemo(
    () =>
      wordCount > recordsPerPage
        ? getCurrentPageWords(
            archivedWords,
            fromIndex,
            recordsPerPage + fromIndex
          )
        : archivedWords,
    [archivedWords, fromIndex, recordsPerPage, wordCount]
  );

  const pageChangeHandler = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) =>
      appDispatch(archivedActions.setCurrentPage(value)),
    [appDispatch]
  );

  return {
    pageChangeHandler,
    searchedText,
    wordCount,
    wordsToShow,
  };
};

export default useArchive;
