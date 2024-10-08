/** COMPONENTS */
import Button from "../button/Button";
import Icon from "../icon/Icon";

/** LIBRARIES */
import { FC, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { IconStyles, LinkIcons, UtilityIcons } from "../../../models/icon";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { favoriteActions } from "../../../store/favorite";
import { searchedActions } from "../../../store/searched";
import {
  containsWordsOfLength,
  removeDuplicates,
  sortByNumberASC,
} from "../../../helpers/utils";

/** STYLES */
import styles from "./Buttons.module.css";

interface ButtonsProps {
  disposableWords: string[];
  labels: number[];
  totalWordsFound: number;
}

const Buttons: FC<ButtonsProps> = ({
  disposableWords,
  labels,
  totalWordsFound,
}) => {
  const { candidates: favoriteCandidates } = useSelector(
    (state: RootState) => state.favorite
  );
  const { lengthFilters } = useSelector((state: RootState) => state.searched);
  const appDispatch = useAppDispatch();

  const filterBtns = useMemo(
    () =>
      removeDuplicates<number>(labels)
        .sort(sortByNumberASC)
        .filter((btn) => containsWordsOfLength(disposableWords, btn)),
    [disposableWords, labels]
  );

  const resetLengthFilters = useCallback(() => {
    appDispatch(searchedActions.setPropertyToInitialValue("lengthFilters"));
    appDispatch(searchedActions.setPropertyToInitialValue("removedWords"));
    appDispatch(favoriteActions.setPropertyToInitialValue("candidates"));
  }, [appDispatch]);

  const addLengthFilter = useCallback(
    (num: number) => appDispatch(searchedActions.addLengthFilter(num)),
    [appDispatch]
  );

  const removeLengthFilter = useCallback(
    (num: number) => appDispatch(searchedActions.removeLengthFilter(num)),
    [appDispatch]
  );

  return (
    <section className={styles.buttons}>
      <section>
        {filterBtns.length > 1 &&
          filterBtns.map((num) => {
            const isMarked = lengthFilters.indexOf(num) >= 0;
            const clickHandler = isMarked
              ? removeLengthFilter
              : addLengthFilter;

            return (
              <Button
                key={num}
                isMarked={isMarked}
                label={num}
                onClick={() => clickHandler(num)}
              />
            );
          })}
      </section>
      <section>
        {totalWordsFound > 0 && (
          <Icon
            iconClass={UtilityIcons.RESET}
            iconStyles={IconStyles.ICON_BUTTON}
            onClick={resetLengthFilters}
          />
        )}
        {favoriteCandidates.length > 0 && (
          <Icon
            iconClass={LinkIcons.FAVORITE}
            iconStyles={IconStyles.ICON_BUTTON}
          />
        )}
      </section>
    </section>
  );
};

export default Buttons;
