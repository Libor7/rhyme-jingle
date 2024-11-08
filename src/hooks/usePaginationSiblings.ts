/** HOOKS */
import useWindowSize from "./useWindowSize";

const usePaginationSiblings = () => {
    const { isExtraSmall, isSmall, isMedium } = useWindowSize();

    return isExtraSmall || isSmall ? 0 : isMedium ? 1 : 2;
};

export default usePaginationSiblings;
