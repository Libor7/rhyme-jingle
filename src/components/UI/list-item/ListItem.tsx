/** COMPONENTS */
import Icon, { IconHandle } from "../icon/Icon";

/** LIBRARIES */
import { FC, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { IconStyles, UtilityIcons } from "../../../models/icon";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { favoriteActions } from "../../../store/favorite";
import { searchedActions } from "../../../store/searched";

/** STYLES */
import styles from "./ListItem.module.css";

interface ListItemProps {
  label: string;
}

const ListItem: FC<ListItemProps> = ({ label }) => {
  const { candidates: favoriteCandidates } = useSelector(
    (state: RootState) => state.favorite
  );
  const appDispatch = useAppDispatch();
  const iconRef = useRef<IconHandle>(null);

  const isFavoriteCandidate = favoriteCandidates.indexOf(label) >= 0;
  const classes = `${styles.li} ${
    isFavoriteCandidate ? styles["marked-favorite"] : ""
  }`;

  const itemClickHandler = useCallback(() => {
    isFavoriteCandidate
      ? appDispatch(favoriteActions.removeCandidate(label))
      : appDispatch(favoriteActions.addCandidate(label));
  }, [appDispatch, isFavoriteCandidate, label]);

  const iconClickHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      appDispatch(searchedActions.removeListedWord(label));
      appDispatch(favoriteActions.removeCandidate(label));
    },
    [appDispatch, label]
  );

  const mouseOutHandler = useCallback(
    () => iconRef.current?.mouseoutHandler(),
    []
  );

  const mouseOverHandler = useCallback(
    () => iconRef.current?.mouseoverHandler(),
    []
  );

  return (
    <li
      className={classes}
      onClick={itemClickHandler}
      onMouseOut={mouseOutHandler}
      onMouseOver={mouseOverHandler}
    >
      <span>{label}</span>
      <Icon
        ref={iconRef}
        iconClass={UtilityIcons.TRASH}
        iconStyles={IconStyles.ICON_BUTTON}
        onClick={iconClickHandler}
      />
    </li>
  );
};

export default ListItem;
