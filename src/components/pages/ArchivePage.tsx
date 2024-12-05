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
    hasPagination,
    searchedText,
    setSearchedText,
    wordCount,
    wordsToShow,
    ...other
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
        dialogContent={{
          title: APP_CONTENT.DIALOG.INFO.DELETE_ALL.TITLE("archivované"),
          text: APP_CONTENT.DIALOG.INFO.DELETE_ALL.DESCRIPTION("Archivované"),
        }}
      />
      <List words={wordsToShow} />
      {hasPagination && (
        <StyledPagination
          showFirstButton
          showLastButton
          siblingCount={siblings}
          size="large"
          {...other}
        />
      )}
    </>
  );
};

export default ArchivePage;
