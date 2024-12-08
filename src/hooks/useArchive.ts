/** LIBRARIES */
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { INITIAL_PAGE, MINIMAL_STRING_LENGTH_OTHER } from "models/constants";

/** OTHER */
import { filterByText } from "helpers/utils";
import { type RootState, useAppDispatch } from "store";
import { archivedActions } from "store/archived";

const useArchive = () => {
  const { archived, currentPage, recordsPerPage, searchedText } = useSelector(
    ({ archived }: RootState) => archived
  );
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(archivedActions.setCurrentPage(INITIAL_PAGE));
  }, [appDispatch, searchedText]);

  const setSearchedText = useCallback(
    (value: string) => appDispatch(archivedActions.setSearchedText(value)),
    [appDispatch]
  );

  const archivedFilteredByText = useMemo(
    () => filterByText(archived, searchedText, MINIMAL_STRING_LENGTH_OTHER),
    [archived, searchedText]
  );

  const archivedWords =
    searchedText.length > 0 ? archivedFilteredByText : archived;
  const wordCount = archivedWords.length;
  const hasPagination = wordCount > recordsPerPage;

  const fromIndex = recordsPerPage * currentPage - recordsPerPage;
  const getCurrentPageWords = useCallback(
    (words: string[]) => words.slice(fromIndex, recordsPerPage + fromIndex),
    [fromIndex, recordsPerPage]
  );

  const wordsToShow = useMemo(
    () => (hasPagination ? getCurrentPageWords(archivedWords) : archivedWords),
    [archivedWords, getCurrentPageWords, hasPagination]
  );

  const pageChangeHandler = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) =>
      appDispatch(archivedActions.setCurrentPage(value)),
    [appDispatch]
  );

  return {
    count: Math.ceil(wordCount / recordsPerPage),
    hasPagination,
    onChange: pageChangeHandler,
    page: currentPage,
    searchedText,
    setSearchedText,
    wordCount,
    wordsToShow,
  };
};

export default useArchive;
