/** COMPONENTS */
import Icon from "../icon/Icon";

/** LIBRARIES */
import { FC } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { IconStyles, UtilityIcons } from "../../../models/icon";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { searchedActions } from "../../../store/searched";

/** STYLES */
import styles from "./ListItem.module.css";
import { favoriteActions } from "../../../store/favorite";

interface ListItemProps {
  label: string;
}

const ListItem: FC<ListItemProps> = ({ label }) => {
  const { favoriteCandidates } = useSelector(
    (state: RootState) => state.favorite
  );
  const appDispatch = useAppDispatch();

  const isFavoriteCandidate = favoriteCandidates.indexOf(label) >= 0;
  const classes = `${styles.li} ${isFavoriteCandidate && styles['marked-favorite']}`;

  const itemClickHandler = () => {
    isFavoriteCandidate
      ? appDispatch(favoriteActions.removeFavoriteCandidate(label))
      : appDispatch(favoriteActions.addFavoriteCandidate(label));
  };

  const iconClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    appDispatch(searchedActions.addRemovedWord(label));
    appDispatch(favoriteActions.removeFavoriteCandidate(label));
  };

  return (
    <li className={classes} onClick={itemClickHandler}>
      <span>{label}</span>
      <Icon
        iconClass={UtilityIcons.CROSS}
        iconStyles={IconStyles.ICON_BUTTON}
        onClick={iconClickHandler}
      />
    </li>
  );
};

export default ListItem;
