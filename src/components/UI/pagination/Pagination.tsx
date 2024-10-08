/** COMPONENTS */
import PaginationButtons from "../pagination-buttons/PaginationButtons";
import PaginationMobile from "../pagination-mobile/PaginationMobile";

/** LIBRARIES */
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { WordsPerPage } from "../../../models/common";
import { INITIAL_PAGE } from "../../../models/constants";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { searchedActions } from "../../../store/searched";

/** STYLES */
import styles from "./Pagination.module.css";

interface PaginationProps {
  wordCount: number;
}

const Pagination: FC<PaginationProps> = ({ wordCount }) => {
  const { searchedText } = useSelector((state: RootState) => state.searched);
  const appDispatch = useAppDispatch();

  const pageCount = Math.ceil(wordCount / WordsPerPage.FIVE);

  useEffect(() => {
    appDispatch(searchedActions.setCurrentPage(INITIAL_PAGE));
  }, [appDispatch, searchedText]);

  return (
    <PaginationButtons pageCount={pageCount}>
      <PaginationMobile pageCount={pageCount} />
    </PaginationButtons>
  );
};

export default Pagination;
