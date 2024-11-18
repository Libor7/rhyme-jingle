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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/** MODELS */
import { palettes } from "models/constants";
import { Label, Path, type ILink } from "models/link";

/** OTHER */
import { type RootState } from "store";

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
  const { pathname } = useLocation();
  const { isExtraSmall, isSmall } = useWindowSize();
  const { colorPalette } = useSelector(({ settings }: RootState) => settings);

  const theme = createTheme({
    palette: palettes.get(colorPalette),
    typography: {
      fontFamily: ["Parisienne", "serif"].join(","),
    },
  });

  const nonactiveLinks = links.filter((link) => link.path !== pathname);

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
