/** CUSTOM COMPONENTS */
import AdditionalControls from "components/other/AdditionalControls";
import List from "components/UI/List";
import NoResultsFound from "components/UI/NoResultsFound";
import SearchField from "components/UI/SearchField";

/** LIBRARIES */
import { useSelector } from "react-redux";

/** HOOKS */
import useArchive from "hooks/useArchive";
import usePaginationSiblings from "hooks/usePaginationSiblings";

/** MODELS */
import APP_CONTENT from "models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "store/index";
import { archivedActions } from "store/archived";

/** STYLED COMPONENTS */
import { StyledPagination } from "components/styled/StyledPagination";

const ArchivePage = () => {
  const appDispatch = useAppDispatch();
  const siblings = usePaginationSiblings();
  const { currentPage, recordsPerPage } = useSelector(
    ({ archived }: RootState) => archived
  );
  const { pageChangeHandler, searchedText, wordCount, wordsToShow } =
    useArchive();

  return (
    <>
      <SearchField
        id="search-arch"
        placeholder={APP_CONTENT.SEARCHFIELD.PLACEHOLDER.ARCHIVED}
        setValue={(value: string) =>
          appDispatch(archivedActions.setSearchedText(value))
        }
        value={searchedText}
      />
      {searchedText === "" && wordsToShow.length === 0 && (
        <NoResultsFound
          heading={APP_CONTENT.HEADINGS.ARCHIVE_PAGE}
          text={APP_CONTENT.TEXT_CONTENT.ARCHIVE_PAGE}
        />
      )}
      {wordCount > 0 && (
        <AdditionalControls
          count={wordCount}
          dialogContent={{
            title: APP_CONTENT.DIALOG.INFO.DELETE_ALL.TITLE("archivované"),
            text: APP_CONTENT.DIALOG.INFO.DELETE_ALL.DESCRIPTION("Archivované"),
          }}
        />
      )}
      {wordsToShow.length > 0 && <List words={wordsToShow} />}
      {wordCount > recordsPerPage && (
        <StyledPagination
          count={Math.ceil(wordCount / recordsPerPage)}
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
