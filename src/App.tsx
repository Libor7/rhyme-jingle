/** CUSTOM COMPONENTS */
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

/** HOOKS */
import useWindowSize from "./hooks/useWindowSize";

/** LIBRARIES */
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";

/** MODELS */
import APP_CONTENT from "./models/constants";
import { Icon } from "./models/icon";
import { Label, Path, Link } from "./models/link";

const LINK_ALT_TEXT = APP_CONTENT.ICON.ALT_TEXT.LINK;

const links: Link[] = [
  {
    alt: LINK_ALT_TEXT.SEARCHED,
    icon: Icon.SEARCH,
    label: Label.SEARCH,
    path: Path.SEARCH,
  },
  {
    alt: LINK_ALT_TEXT.FAVORITE,
    icon: Icon.FAVORITE,
    label: Label.FAVORITE,
    path: Path.FAVORITE,
  },
  {
    alt: LINK_ALT_TEXT.ARCHIVED,
    icon: Icon.ARCHIVE,
    label: Label.ARCHIVE,
    path: Path.ARCHIVE,
  },
  {
    alt: LINK_ALT_TEXT.SETTINGS,
    icon: Icon.SETTINGS,
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
