/** COMPONENTS */
import Button from "../../UI/button/Button";
import Icon from "../../UI/icon/Icon";

/** LIBRARIES */
import { FC, useCallback } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { IconStyles, LinkIcons, UtilityIcons } from "../../../models/icon";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { searchedActions } from "../../../store/searched";
import { favoriteActions } from "../../../store/favorite";

/** STYLES */
import styles from "./MiscellaneousControls.module.css";

interface MiscellaneousControlsProps {
  totalWordsFound: number;
}

const MiscellaneousControls: FC<MiscellaneousControlsProps> = ({
  totalWordsFound,
}) => {
  const { candidates } = useSelector((state: RootState) => state.favorite);
  const appDispatch = useAppDispatch();

  const hasCandidates = candidates.length > 0;

  const resetWordsFound = useCallback(() => {
    appDispatch(searchedActions.setPropertyToInitialValue("lengthFilters"));
    appDispatch(searchedActions.setPropertyToInitialValue("removedWords"));
    appDispatch(favoriteActions.setPropertyToInitialValue("candidates"));
  }, [appDispatch]);

  return (
    <section className={styles.container}>
      {totalWordsFound > 0 && (
        <Button onClick={resetWordsFound}>
          <Icon
            iconClass={UtilityIcons.RESET}
            iconStyles={IconStyles.ICON_BUTTON}
          />
        </Button>
      )}
      {hasCandidates && (
        <Button onClick={() => {}}>
          <Icon
            iconClass={LinkIcons.FAVORITE}
            iconStyles={IconStyles.ICON_BUTTON}
          />
        </Button>
      )}
      {/* Todo - hasCandidates zmeniť na podmienku, či vyhľadalo viac search texts oddelených čiarkou - pridať placeholder do inputu */}
      {/* že je možné hľadať viac možností naraz oddelených čiarkou  */}
      {hasCandidates && (
        <Button onClick={() => {}}>
          <Icon
            iconClass={UtilityIcons.FILTER}
            iconStyles={IconStyles.ICON_BUTTON}
          />
        </Button>
      )}
    </section>
  );
};

export default MiscellaneousControls;
