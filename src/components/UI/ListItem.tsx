/** COMPONENTS */
import ListItemText from "@mui/material/ListItemText";
import MUIListItem, { type ListItemProps } from "@mui/material/ListItem";

/** CUSTOM COMPONENTS */
import LinkItemActions from "./LinkItemActions";

/** LIBRARIES */
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import { type FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

/** MODELS */
import { Path } from "models/link";

/** OTHER */
import { hasArrayElement } from "helpers/utils";
import { type RootState, useAppDispatch } from "store";
import { favoriteActions } from "store/favorite";
import { searchedActions } from "store/searched";

const ListItemWithMotion: FC<ListItemProps<"li">> = (props) => (
  <MUIListItem
    layout
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.4 }}
    component={motion.li}
    {...props}
  />
);

const StyledMUIListItem = styled(ListItemWithMotion)<IStyledMUIListItemProps>(
  ({ theme, favoritecandidate }) => ({
    backgroundColor: favoritecandidate
      ? theme.palette.primary.light
      : theme.palette.primary.main,
    color: theme.palette.secondary.light,
    cursor: "pointer",
    margin: "0.25em 0",
    padding: 0,

    "&:hover, &:focus, &:focus-visible, &:focus-within": {
      backgroundColor: favoritecandidate
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
      outline: "none",
    },

    [theme.breakpoints.up("sm")]: {
      width: "calc((100% - 0.5em) / 2)",
    },

    [theme.breakpoints.up("md")]: {
      width: "calc((100% - 1em) / 3)",
    },
  })
);

const StyledListItemText = styled(ListItemText)(() => ({
  webkitHyphens: "auto",
  mozHyphens: "auto",
  msHyphens: "auto",
  hyphens: "auto",
  margin: 0,
  padding: "0.5em 1.5em",

  "& > .MuiTypography-root": {
    fontSize: "1.5em",
  },
}));

interface IStyledMUIListItemProps {
  favoritecandidate: number;
}

interface IListItemProps {
  label: string;
}

const ListItem: FC<IListItemProps> = ({ label }) => {
  const { archived } = useSelector(({ archived }: RootState) => archived);
  const { candidates, favorites } = useSelector(
    ({ favorite }: RootState) => favorite
  );
  const appDispatch = useAppDispatch();
  const { push } = useHistory();
  const { pathname } = useLocation();

  const isArchived = hasArrayElement(archived, label);
  const isCandidate = hasArrayElement(candidates, label);
  const isFavorite = hasArrayElement(favorites, label);

  const toggleCandidate = useCallback(() => {
    if (isFavorite) return;

    if (isArchived && pathname === "/archive") {
      appDispatch(searchedActions.setSearchedText(label));
      return push({ pathname: Path.SEARCH, search: `?archived_text=${label}` });
    }

    isCandidate
      ? appDispatch(favoriteActions.removeCandidate(label))
      : appDispatch(favoriteActions.addCandidate(label));
  }, [isFavorite, isArchived, pathname, isCandidate, appDispatch, label, push]);

  return (
    <StyledMUIListItem
      favoritecandidate={isCandidate ? 1 : 0}
      onClick={({ currentTarget }) => {
        currentTarget.blur();
        toggleCandidate();
      }}
      onKeyDown={({ key }) => key === "Enter" && toggleCandidate()}
      sx={{ boxShadow: 3 }}
      tabIndex={0}
    >
      <StyledListItemText lang="sk">{label}</StyledListItemText>
      <LinkItemActions
        isFavorite={isFavorite}
        isCandidate={isCandidate}
        label={label}
      />
    </StyledMUIListItem>
  );
};

export default ListItem;
