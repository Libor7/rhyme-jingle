/** COMPONENTS */
import ArchivePage from "../../pages/archive/ArchivePage";
import FavoritePage from "../../pages/favorite/FavoritePage";
import SearchPage from "../../pages/search/SearchPage";
import SettingsPage from "../../pages/settings/SettingsPage";

/** LIBRARIES */
import { Redirect, Route, Switch } from "react-router-dom";

/** MODELS */
import { LinkPaths } from "../../../models/link";

/** STYLES */
import styles from "./MainContent.module.css";

const MainContent = () => {
  return (
    <main className={styles.main}>
      <Switch>
        <Route path={LinkPaths.SEARCH}>
          <SearchPage />
        </Route>
        <Route path={LinkPaths.FAVORITE}>
          <FavoritePage />
        </Route>
        <Route path={LinkPaths.ARCHIVE}>
          <ArchivePage />
        </Route>
        <Route path={LinkPaths.SETTINGS}>
          <SettingsPage />
        </Route>
        <Route path="*">
          <Redirect to={LinkPaths.SEARCH} />
        </Route>
      </Switch>
    </main>
  );
};

export default MainContent;
