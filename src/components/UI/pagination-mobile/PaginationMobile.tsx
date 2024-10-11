/** COMPONENTS */
import Button from "../button/Button";
import Icon from "../icon/Icon";
import Input from "../input/Input";
import Modal from "../dialog/modal/Modal";

/** LIBRARIES */
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { INITIAL_PAGE } from "../../../models/constants";
import { IconStyles, UtilityIcons } from "../../../models/icon";
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

  useEffect(() => {
    setPageNum(currentPage);
  }, [currentPage]);

  const toggleDialogHandler = useCallback(() => {
    setIsDialogOpen((prevState) => !prevState);
    setPageNum(currentPage);
  }, [currentPage]);

  const pageChangeHandler = useCallback(
    ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = +value < 1 ? 1 : +value < pageCount ? +value : pageCount;
      setPageNum(newValue);
    },
    [pageCount]
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
              value: pageNum < pageCount ? pageNum : pageCount,
              max: pageCount,
              min: INITIAL_PAGE,
            }}
          />
          <div className={styles.controls}>
            <Button onClick={savePageHandler}>
              <Icon
                iconClass={UtilityIcons.CHECK}
                iconStyles={IconStyles.ICON_BUTTON}
              />
            </Button>
            <Button onClick={toggleDialogHandler}>
              <Icon
                iconClass={UtilityIcons.CROSS}
                iconStyles={IconStyles.ICON_BUTTON}
              />
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PaginationMobile;
