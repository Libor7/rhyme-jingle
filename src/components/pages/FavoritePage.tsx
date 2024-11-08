/** CUSTOM COMPONENTS */
import List from "../UI/List";
import SearchField from "../UI/SearchField";
import WordCount from "../UI/WordCount";

/** HOOKS */
import useFavorite from "../../hooks/useFavorite";
import usePaginationSiblings from "../../hooks/usePaginationSiblings";

/** LIBRARIES */
import { useCallback } from "react";

/** MODELS */
import APP_CONTENT from "../../models/constants";

/** OTHER */
import { useAppDispatch } from "../../store";
import { favoriteActions } from "../../store/favorite";
import { StyledPagination } from "../styled/StyledPagination";

const FavoritePage = () => {
  const appDispatch = useAppDispatch();
  const {
    currentPage,
    hasPagination,
    pageCount,
    pageChangeHandler,
    searchedText,
    wordCount,
    wordsToShow,
  } = useFavorite();
  const siblings = usePaginationSiblings();

  const setSearchedText = useCallback(
    (value: string) => appDispatch(favoriteActions.setSearchedText(value)),
    [appDispatch]
  );

  return (
    <>
      <SearchField
        id="search-fav"
        placeholder={APP_CONTENT.SEARCHFIELD.PLACEHOLDER.FAVORITE}
        setValue={setSearchedText}
        value={searchedText}
      />
      <WordCount
        adjectives={["obľúbených", "obľúbené"]}
        count={wordCount}
      />
      <List words={wordsToShow} />
      {hasPagination && (
        <StyledPagination
          count={pageCount}
          onChange={pageChangeHandler}
          page={currentPage}
          showFirstButton
          showLastButton
          siblingCount={siblings}
          size="large"
        />
      )}
    </>
  );
};

export default FavoritePage;
