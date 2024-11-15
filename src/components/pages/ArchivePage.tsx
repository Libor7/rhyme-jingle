/** CUSTOM COMPONENTS */
import AdditionalControls from "components/other/AdditionalControls";
import List from "components/UI/List";
import SearchField from "components/UI/SearchField";

/** HOOKS */
import useArchive from "hooks/useArchive";
import usePaginationSiblings from "hooks/usePaginationSiblings";

/** MODELS */
import APP_CONTENT from "models/constants";

/** STYLED COMPONENTS */
import { StyledPagination } from "components/styled/StyledPagination";

const ArchivePage = () => {
  const siblings = usePaginationSiblings();
  const {
    currentPage,
    hasPagination,
    pageCount,
    pageChangeHandler,
    searchedText,
    setSearchedText,
    wordCount,
    wordsToShow,
  } = useArchive();

  return (
    <>
      <SearchField
        id="search-arch"
        placeholder={APP_CONTENT.SEARCHFIELD.PLACEHOLDER.ARCHIVED}
        setValue={setSearchedText}
        value={searchedText}
      />
      <AdditionalControls
        count={wordCount}
        dialogText={{
          title: APP_CONTENT.DIALOG.ARCHIVED.TITLE,
          description: APP_CONTENT.DIALOG.ARCHIVED.DESCRIPTION,
        }}
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

export default ArchivePage;
