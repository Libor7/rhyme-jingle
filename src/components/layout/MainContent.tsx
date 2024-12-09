/** COMPONENTS */
import CircularProgress from "@mui/material/CircularProgress";

/** LIBRARIES */
import { styled } from "@mui/system";
import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

/** MODELS */
import { Path } from "models/link";

const ArchivePage = lazy(() => import("components/pages/ArchivePage"));
const FavoritePage = lazy(() => import("components/pages/FavoritePage"));
const SearchPage = lazy(() => import("components/pages/SearchPage"));
const SettingsPage = lazy(() => import("components/pages/SettingsPage"));

const StyledMain = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: "1em 0.75em",

  [theme.breakpoints.up("sm")]: {
    padding: "1em calc(0.75em + 10%)",
  },
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  left: "calc(50% - 2em)",
  position: "absolute",
  top: "calc(50% - 2em)",
}));

const MainContent = () => {
  return (
    <StyledMain>
      <Suspense fallback={<StyledCircularProgress size="4em" />}>
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
      </Suspense>
    </StyledMain>
  );
};

export default MainContent;
