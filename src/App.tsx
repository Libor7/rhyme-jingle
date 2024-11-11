/** CUSTOM COMPONENTS */
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import MainContent from "components/layout/MainContent";

/** HOOKS */
import useWindowSize from "hooks/useWindowSize";

/** ICONS */
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";

/** LIBRARIES */
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/** MODELS */
import { palettes } from "models/constants";
import { Label, Path, type ILink } from "models/link";
import { useEffect } from "react";

/** OTHER */
import { getLocalStorageValue } from "helpers/utils";
import { RootState, useAppDispatch } from "store";
import { favoriteActions } from "store/favorite";
import { settingsActions } from "store/settings";

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
  const { colorPalette } = useSelector((state: RootState) => state.settings);
  const storedFavorites = getLocalStorageValue<string[]>("favorites", []);
  const storedColorPalette = getLocalStorageValue<string>(
    "colorPalette",
    "coffeeBeige"
  );

  const theme = createTheme({
    palette: palettes.get(colorPalette),
    typography: {
      fontFamily: ["Parisienne", "serif"].join(","),
    },
  });

  const nonactiveLinks = links.filter(
    (link) => link.path !== location.pathname
  );

  useEffect(() => {
    appDispatch(favoriteActions.setFavorites(storedFavorites));
  }, [appDispatch, storedFavorites]);

  useEffect(() => {
    appDispatch(settingsActions.setColorPalette(storedColorPalette));
  }, [appDispatch, storedColorPalette]);

  return (
    <ThemeProvider theme={theme}>
      <StyledDiv>
        <Header links={nonactiveLinks} />
        <MainContent />
        {(isExtraSmall || isSmall) && <Footer links={nonactiveLinks} />}
      </StyledDiv>
    </ThemeProvider>
  );
};

export default App;
