/** COMPONENTS */
import ListItemText from "@mui/material/ListItemText";
import MUIListItem from "@mui/material/ListItem";

/** CUSTOM COMPONENTS */
import LinkItemActions from "./LinkItemActions";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

/** MODELS */
import { Path } from "models/link";

/** OTHER */
import { hasArrayElement } from "helpers/utils";
import { type RootState, useAppDispatch } from "store";
import { favoriteActions } from "store/favorite";
import { searchedActions } from "store/searched";

const StyledMUIListItem = styled(MUIListItem)<IStyledMUIListItemProps>(
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

  const isArchived = hasArrayElement(archived, label);
  const isCandidate = hasArrayElement(candidates, label);
  const isFavorite = hasArrayElement(favorites, label);

  const toggleCandidate = useCallback(() => {
    if (isFavorite) return;

    if (isArchived) {
      appDispatch(searchedActions.setSearchedText(label));
      return push({ pathname: Path.SEARCH, search: `?archived_text=${label}` });
    }

    isCandidate
      ? appDispatch(favoriteActions.removeCandidate(label))
      : appDispatch(favoriteActions.addCandidate(label));
  }, [isFavorite, isArchived, isCandidate, appDispatch, label, push]);

  const itemClickHandler = useCallback(
    ({ currentTarget }: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      currentTarget.blur();
      toggleCandidate();
    },
    [toggleCandidate]
  );

  const itemKeyHandler = useCallback(
    ({ key }: React.KeyboardEvent<HTMLLIElement>) =>
      key === "Enter" && toggleCandidate(),
    [toggleCandidate]
  );

  return (
    <StyledMUIListItem
      favoritecandidate={isCandidate ? 1 : 0}
      onClick={itemClickHandler}
      onKeyDown={itemKeyHandler}
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
