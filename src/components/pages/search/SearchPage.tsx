/** COMPONENTS */
import Buttons from "../../UI/buttons/Buttons";
import List from "../../UI/list/List";
import SearchField from "../../../components/UI/search-field/SearchField";
import WordCount from "../../UI/word-count/WordCount";

/** LIBRARIES */
import { useEffect } from "react";
import { useSelector } from "react-redux";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { favoriteActions } from "../../../store/favorite";
import { searchedActions } from "../../../store/searched";
import {
  filterByText,
  filterByTextLength,
  wordsToWordlengths,
} from "../../../helpers/utils";

const SearchPage = () => {
  const { allWords, removedWords, searchedText, wordLengthFilters } =
    useSelector((state: RootState) => state.searched);
  const appDispatch = useAppDispatch();

  const isBtnFilterApplied = wordLengthFilters.length > 0;

  useEffect(() => {
    appDispatch(searchedActions.resetWordLengthFilters());
    appDispatch(searchedActions.resetRemovedWords());
  }, [appDispatch, searchedText]);

  useEffect(() => {
    return () => {
      appDispatch(searchedActions.setStateToInitial());
      appDispatch(favoriteActions.resetFavoriteCandidates());
    };
  }, []);

  const wordsFilteredByText = filterByText(allWords, searchedText);
  const wordLengths = wordsToWordlengths(wordsFilteredByText);

  const wordsFilteredByRemovedWords = wordsFilteredByText.filter(
    (word) => removedWords.indexOf(word) === -1
  );

  const wordsFilteredByLength = filterByTextLength(
    wordsFilteredByRemovedWords,
    wordLengthFilters
  );

  const wordsToShow = isBtnFilterApplied
    ? wordsFilteredByLength
    : wordsFilteredByRemovedWords;

  return (
    <>
      <SearchField />
      {searchedText.length > 0 && <WordCount count={wordsToShow.length} />}
      <Buttons
        labels={wordLengths}
        totalWordsFound={wordsFilteredByText.length}
      />
      <List words={wordsToShow} />
    </>
  );
};

export default SearchPage;
