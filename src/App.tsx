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
import { Icon } from "./models/icon";
import { Label, Path, Link } from "./models/link";

const links: Link[] = [
  {
    icon: Icon.SEARCH,
    label: Label.SEARCH,
    path: Path.SEARCH,
  },
  {
    icon: Icon.FAVORITE,
    label: Label.FAVORITE,
    path: Path.FAVORITE,
  },
  {
    icon: Icon.ARCHIVE,
    label: Label.ARCHIVE,
    path: Path.ARCHIVE,
  },
  {
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
