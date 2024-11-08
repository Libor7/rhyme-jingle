/** CUSTOM COMPONENTS */
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

/** HOOKS */
import useWindowSize from "./hooks/useWindowSize";

/** ICONS */
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';

/** LIBRARIES */
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";

/** MODELS */
import { Label, Path, type ILink } from "./models/link";
import { useEffect } from "react";

/** OTHER */
import { useAppDispatch } from "./store";
import { favoriteActions } from "./store/favorite";
import { getLocalStorageValue } from "./helpers/utils";

const links: ILink[] = [
  {
    icon: SearchIcon,
    label: Label.SEARCH,
    path: Path.SEARCH,
  },
  {
    icon: StarIcon,
    label: Label.FAVORITE,
    path: Path.FAVORITE,
  },
  {
    icon: FolderIcon,
    label: Label.ARCHIVE,
    path: Path.ARCHIVE,
  },
  {
    icon: SettingsIcon,
    label: Label.SETTINGS,
    path: Path.SETTINGS,
  },
];

const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const App = () => {
  const appDispatch = useAppDispatch();
  const location = useLocation();
  const { isExtraSmall, isSmall } = useWindowSize();
  const storedFavorites = getLocalStorageValue<string[]>("favorites", []);

  const nonactiveLinks = links.filter(
    (link) => link.path !== location.pathname
  );

  useEffect(() => {
    appDispatch(favoriteActions.setFavorites(storedFavorites));
  }, [appDispatch, storedFavorites]);

  return (
    <StyledDiv>
      <Header links={nonactiveLinks} />
      <MainContent />
      {(isExtraSmall || isSmall) && <Footer links={nonactiveLinks} />}
    </StyledDiv>
  );
};

export default App;
