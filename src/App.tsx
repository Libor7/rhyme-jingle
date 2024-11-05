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
import { Label, Path, Link } from "./models/link";

const links: Link[] = [
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
  const location = useLocation();
  const { isExtraSmall, isSmall } = useWindowSize();

  const nonactiveLinks = links.filter(
    (link) => link.path !== location.pathname
  );

  return (
    <StyledDiv>
      <Header links={nonactiveLinks} />
      <MainContent />
      {(isExtraSmall || isSmall) && <Footer links={nonactiveLinks} />}
    </StyledDiv>
  );
};

export default App;
