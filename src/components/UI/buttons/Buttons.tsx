/** COMPONENTS */
import Button from "../button/Button";
import Icon from "../icon/Icon";

/** LIBRARIES */
import { FC } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { IconStyles, LinkIcons, UtilityIcons } from "../../../models/icon";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { favoriteActions } from "../../../store/favorite";
import { searchedActions } from "../../../store/searched";
import { removeDuplicates, sortByNumberASC } from "../../../helpers/utils";

/** STYLES */
import styles from "./Buttons.module.css";

interface ButtonsProps {
  labels: number[];
  totalWordsFound: number;
}

const Buttons: FC<ButtonsProps> = ({ labels, totalWordsFound }) => {
  const { favoriteCandidates } = useSelector(
    (state: RootState) => state.favorite
  );
  const appDispatch = useAppDispatch();

  const filterBtns = removeDuplicates<number>(labels).sort(sortByNumberASC);

  const resetLengthFilters = () => {
    appDispatch(searchedActions.resetWordLengthFilters());
    appDispatch(searchedActions.resetRemovedWords());
    appDispatch(favoriteActions.resetFavoriteCandidates());
  };

  return (
    <section className={styles.buttons}>
      <section>
        {filterBtns.map((num) => (
          <Button key={num} label={num} />
        ))}
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
