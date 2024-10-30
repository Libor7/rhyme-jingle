/** CUSTOM COMPONENTS */
import Icon from "./Icon";

/** COMPONENTS */
import ListItemText from "@mui/material/ListItemText";
import MUIListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC, useCallback } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import APP_CONTENT from "../../models/constants";
import { Icon as IconEnum } from "../../models/icon";

/** OTHER */
import { RootState, useAppDispatch } from "../../store";
import { favoriteActions } from "../../store/favorite";
import { searchedActions } from "../../store/searched";

const StyledPaper = styled(Paper)<StyledPaperProps>(({ theme, favorite }) => ({
  backgroundColor: favorite
    ? theme.palette.primary.light
    : theme.palette.primary.main,
  color: theme.palette.secondary.light,
  cursor: "pointer",
  margin: "0.25em 0",

  "&:hover, &:focus, &:focus-visible, &:focus-within": {
    backgroundColor: favorite
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
  },
}));

const StyledMUIListItem = styled(MUIListItem)(() => ({
  padding: 0,

  "&:focus-visible": {
    outline: "none",
  },
}));

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

interface StyledPaperProps {
  favorite: number;
}

interface ListItemProps {
  label: string;
}

const ListItem: FC<ListItemProps> = ({ label }) => {
  const { candidates } = useSelector((state: RootState) => state.favorite);
  const appDispatch = useAppDispatch();

  const isFavorite = candidates.indexOf(label) >= 0;

  const toggleCandidate = useCallback(
    () =>
      isFavorite
        ? appDispatch(favoriteActions.removeCandidate(label))
        : appDispatch(favoriteActions.addCandidate(label)),
    [appDispatch, isFavorite, label]
  );

  const removeItem = useCallback(() => {
    appDispatch(searchedActions.removeListedWord(label));
    appDispatch(favoriteActions.removeCandidate(label));
  }, [appDispatch, label]);

  const itemClickHandler = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.currentTarget.blur();
      toggleCandidate();
    },
    [toggleCandidate]
  );

  const itemEnterKeyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) =>
      event.key === "Enter" && toggleCandidate(),
    [toggleCandidate]
  );

  const iconClickHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      removeItem();
    },
    [removeItem]
  );

  const iconEnterKeyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      event.stopPropagation();
      event.key === "Enter" && removeItem();
    },
    [removeItem]
  );

  return (
    <StyledPaper elevation={3} favorite={isFavorite ? 1 : 0} square>
      <StyledMUIListItem
        onClick={itemClickHandler}
        onKeyDown={itemEnterKeyHandler}
        tabIndex={0}
      >
        <StyledListItemText lang="sk">{label}</StyledListItemText>
        <Icon
          alt={APP_CONTENT.ICON.ALT_TEXT.LIST_ITEM.TRASH_CAN}
          iconClass={IconEnum.TRASH}
          iconStyle="icon"
          isFavorite={isFavorite}
          onClick={iconClickHandler}
          onKeyDown={iconEnterKeyHandler}
        />
      </StyledMUIListItem>
    </StyledPaper>
  );
};

export default ListItem;
