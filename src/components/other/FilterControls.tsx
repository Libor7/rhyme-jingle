/** CUSTOM COMPONENTS */
import Button from "components/UI/Button";

/** HOOKS */
import useWindowSize from "hooks/useWindowSize";

/** ICONS */
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

/** LIBRARIES */
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "@mui/system";
import { type FC, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { Operator } from "models/common";
import { DEFAULT_FILTERS_QUANTITY } from "models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "store";
import { searchedActions } from "store/searched";
import {
  containsWordOfLength,
  hasArrayElement,
  removeDuplicates,
  sortByNumberASC,
} from "helpers/utils";

/** STYLED COMPONENTS */
import { StyledIconButton } from "components/styled/StyledIconButton";

const StyledSection = styled(motion.section)(() => ({
  alignContent: "flex-start",
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  flexWrap: "wrap",
  gap: "0.25em",
  maxWidth: "70%",
}));

interface IFilterControlsProps {
  disposableWords: string[];
  lengths: number[];
}

const FilterControls: FC<IFilterControlsProps> = ({
  disposableWords,
  lengths,
}) => {
  const { lengthFilters } = useSelector(({ searched }: RootState) => searched);
  const appDispatch = useAppDispatch();
  const { isExtraSmall, isSmall } = useWindowSize();
  const [allFiltersShown, setAllFiltersShown] = useState<boolean>(false);

  const wordLengths = useMemo(
    () =>
      removeDuplicates(lengths)
        .sort(sortByNumberASC)
        .filter((length) =>
          containsWordOfLength(disposableWords, length, Operator.EQUAL)
        ),
    [disposableWords, lengths]
  );

  const hasMoreBtn =
    (isExtraSmall || isSmall) && wordLengths.length > DEFAULT_FILTERS_QUANTITY;

  const addLengthFilter = useCallback(
    (num: number) => appDispatch(searchedActions.addLengthFilter(num)),
    [appDispatch]
  );

  const removeLengthFilter = useCallback(
    (num: number) => appDispatch(searchedActions.removeLengthFilter(num)),
    [appDispatch]
  );

  return (
    <>
      {wordLengths.length > 1 && (
        <StyledSection
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <AnimatePresence>
            {wordLengths.length > 1 &&
              wordLengths.map((length, index) => {
                if (!allFiltersShown && hasMoreBtn && index > 1) return null;

                const marked = hasArrayElement(lengthFilters, length);
                const clickHandler = marked
                  ? removeLengthFilter
                  : addLengthFilter;

                return (
                  <Button
                    isMarked={marked}
                    key={length}
                    length={length}
                    onClick={() => clickHandler(length)}
                  />
                );
              })}
          </AnimatePresence>
          {hasMoreBtn && (
            <StyledIconButton
              toggleflag={allFiltersShown ? 1 : 0}
              aria-label="toggle filter buttons"
              disableRipple
              onClick={() => setAllFiltersShown((prevState) => !prevState)}
            >
              <MoreHorizIcon fontSize="inherit" />
            </StyledIconButton>
          )}
        </StyledSection>
      )}
    </>
  );
};

export default FilterControls;
