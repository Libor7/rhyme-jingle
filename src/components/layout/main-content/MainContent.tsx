/** COMPONENTS */
import ArchivePage from "../../pages/archive/ArchivePage";
import FavoritePage from "../../pages/favorite/FavoritePage";
import SearchPage from "../../pages/search/SearchPage";
import SettingsPage from "../../pages/settings/SettingsPage";

/** LIBRARIES */
import { styled } from "@mui/system";
import { Redirect, Route, Switch } from "react-router-dom";

/** MODELS */
import { Path } from "../../../models/link";

const StyledMain = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  flexGrow: 1,
  padding: "1em 0.75em",
}));

const MainContent = () => {
  return (
    <StyledMain>
      <Switch>
        <Route path={Path.SEARCH}>
          <SearchPage />
        </Route>
        <Route path={Path.FAVORITE}>
          <FavoritePage />
        </Route>
        <Route path={Path.ARCHIVE}>
          <ArchivePage />
        </Route>
        <Route path={Path.SETTINGS}>
          <SettingsPage />
        </Route>
        <Route path="*">
          <Redirect to={Path.SEARCH} />
        </Route>
      </Switch>
    </StyledMain>
  );
};

export default MainContent;
