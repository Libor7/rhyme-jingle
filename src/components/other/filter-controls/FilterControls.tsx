/** COMPONENTS */
import Button from "../../UI/button/Button";

/** LIBRARIES */
import { FC, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { searchedActions } from "../../../store/searched";
import {
  containsWordsOfLength,
  removeDuplicates,
  sortByNumberASC,
} from "../../../helpers/utils";

/** STYLES */
import styles from "./FilterControls.module.css";

interface FilterControlsProps {
  disposableWords: string[];
  labels: number[];
}

const FilterControls: FC<FilterControlsProps> = ({
  disposableWords,
  labels,
}) => {
  const { lengthFilters } = useSelector((state: RootState) => state.searched);
  const appDispatch = useAppDispatch();

  const filterBtns = useMemo(
    () =>
      removeDuplicates<number>(labels)
        .sort(sortByNumberASC)
        .filter((btn) => containsWordsOfLength(disposableWords, btn)),
    [disposableWords, labels]
  );

  const addLengthFilter = useCallback(
    (num: number) => appDispatch(searchedActions.addLengthFilter(num)),
    [appDispatch]
  );

  const removeLengthFilter = useCallback(
    (num: number) => appDispatch(searchedActions.removeLengthFilter(num)),
    [appDispatch]
  );

  return (
    <section className={styles.container}>
      {filterBtns.length > 1 &&
        filterBtns.map((num) => {
          const isMarked = lengthFilters.indexOf(num) >= 0;
          const clickHandler = isMarked ? removeLengthFilter : addLengthFilter;

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
  );
};

export default FilterControls;
