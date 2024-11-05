/** LIBRARIES */
import { useSelector } from "react-redux";

/** OTHER */
import { RootState } from "../../store";

const FavoritePage = () => {
  const { favorites } = useSelector((state: RootState) => state.favorite);

  console.log('favorites: ', favorites);

  return <></>;
};

export default FavoritePage;
