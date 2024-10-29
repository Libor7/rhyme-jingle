/** COMPONENTS */
import ArchivePage from "../pages/ArchivePage";
import FavoritePage from "../pages/FavoritePage";
import SearchPage from "../pages/SearchPage";
import SettingsPage from "../pages/SettingsPage";

/** LIBRARIES */
import { styled } from "@mui/system";
import { Redirect, Route, Switch } from "react-router-dom";

/** MODELS */
import { Path } from "../../models/link";

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
