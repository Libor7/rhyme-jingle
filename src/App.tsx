/** COMPONENTS */
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import MainContent from "./components/layout/main-content/MainContent";

/** HOOKS */
import useWindowSize from "./hooks/useWindowSize";

/** LIBRARIES */
import React from "react";

/** MODELS */
import { LinkIcons } from "./models/icon";
import { LinkLabels, LinkPaths, Links } from "./models/link";

/** STYLES */
import styles from "./App.module.css";

const LinkData: Links[] = [
  {
    icon: LinkIcons.SEARCH,
    label: LinkLabels.SEARCH,
    path: LinkPaths.SEARCH,
  },
  {
    icon: LinkIcons.FAVORITE,
    label: LinkLabels.FAVORITE,
    path: LinkPaths.FAVORITE,
  },
  {
    icon: LinkIcons.ARCHIVE,
    label: LinkLabels.ARCHIVE,
    path: LinkPaths.ARCHIVE,
  },
  {
    icon: LinkIcons.SETTINGS,
    label: LinkLabels.SETTINGS,
    path: LinkPaths.SETTINGS,
  },
];

function App() {
  const { isSmall } = useWindowSize();

  return (
    <div className={styles["app-container"]}>
      <Header links={LinkData} />
      <MainContent />
      {isSmall && <Footer links={LinkData} />}
    </div>
  );
}

export default App;
