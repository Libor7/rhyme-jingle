/** COMPONENTS */
import Button from "../button/Button";
import Icon from "../icon/Icon";

/** LIBRARIES */
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { INITIAL_PAGE } from "../../../models/constants";
import { IconStyles, UtilityIcons } from "../../../models/icon";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { searchedActions } from "../../../store/searched";

/** STYLES */
import styles from "./PaginationButtons.module.css";

interface PaginationButtonsProps {
  pageCount: number;
}

const PaginationButtons: FC<PropsWithChildren<PaginationButtonsProps>> = ({
  children,
  pageCount,
}) => {
  const { currentPage: page } = useSelector(
    (state: RootState) => state.searched
  );
  const appDispatch = useAppDispatch();

  const pageChangeHandler = useCallback(
    (moveTo: number, condition: boolean) =>
      condition && appDispatch(searchedActions.setCurrentPage(moveTo)),
    [appDispatch]
  );

  useEffect(() => {
    pageChangeHandler(pageCount, page > pageCount);
  }, [appDispatch, page, pageChangeHandler, pageCount]);

  return (
    <section className={styles["pagination-container"]}>
      <Button onClick={pageChangeHandler.bind(null, INITIAL_PAGE, true)}>
        <Icon
          iconClass={UtilityIcons.ARROW_LEFT_DOUBLE}
          iconStyles={IconStyles.ICON_BUTTON}
        />
      </Button>
      <Button
        onClick={pageChangeHandler.bind(null, page - 1, page > INITIAL_PAGE)}
      >
        <Icon
          iconClass={UtilityIcons.ARROW_LEFT}
          iconStyles={IconStyles.ICON_BUTTON}
        />
      </Button>
      {children}
      <Button
        onClick={pageChangeHandler.bind(null, page + 1, page < pageCount)}
      >
        <Icon
          iconClass={UtilityIcons.ARROW_RIGHT}
          iconStyles={IconStyles.ICON_BUTTON}
        />
      </Button>
      <Button onClick={pageChangeHandler.bind(null, pageCount, true)}>
        <Icon
          iconClass={UtilityIcons.ARROW_RIGHT_DOUBLE}
          iconStyles={IconStyles.ICON_BUTTON}
        />
      </Button>
    </section>
  );
};

export default PaginationButtons;
