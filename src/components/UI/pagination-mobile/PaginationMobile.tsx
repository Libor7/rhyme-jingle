/** COMPONENTS */
import Input from "../input/Input";
import Modal from "../dialog/modal/Modal";

/** LIBRARIES */
import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { INITIAL_PAGE } from "../../../models/constants";
import { InputStyles, InputTypes } from "../../../models/input";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { searchedActions } from "../../../store/searched";

/** STYLES */
import styles from "./PaginationMobile.module.css";

interface PaginationMobileProps {
  pageCount: number;
}

const PaginationMobile: FC<PaginationMobileProps> = ({ pageCount }) => {
  const { currentPage } = useSelector((state: RootState) => state.searched);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(currentPage);
  const appDispatch = useAppDispatch();

  const toggleDialogHandler = useCallback(
    () => setIsDialogOpen((prevState) => !prevState),
    [setIsDialogOpen]
  );

  const pageChangeHandler = useCallback(
    ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) =>
      setPageNum(+currentTarget.value),
    []
  );

  const savePageHandler = useCallback(() => {
    appDispatch(searchedActions.setCurrentPage(pageNum));
    toggleDialogHandler();
  }, [appDispatch, pageNum, toggleDialogHandler]);

  return (
    <>
      <div className={styles.container} onClick={toggleDialogHandler}>
        {currentPage} / {pageCount}
      </div>
      {isDialogOpen && (
        <Modal closeHandler={toggleDialogHandler}>
          <Input
            containerProps={{}}
            fieldProps={{
              id: "pagination",
              className: InputStyles.NUMBER,
              type: InputTypes.NUMBER,
              onChange: pageChangeHandler,
              value: pageNum,
              max: pageCount,
              min: INITIAL_PAGE,
            }}
          />
          <button type="button" onClick={savePageHandler}>
            Change Page
          </button>
        </Modal>
      )}
    </>
  );
};

export default PaginationMobile;
