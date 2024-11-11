/** COMPONENTS */
import IconButton from "@mui/material/IconButton";

/** ICONS */
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC, useCallback } from "react";
import { useLocation } from "react-router-dom";

/** OTHER */
import { useAppDispatch } from "store";
import { favoriteActions } from "store/favorite";
import { searchedActions } from "store/searched";

const StyledDiv = styled("div")<IStyledDivProps>(
  ({ theme, isFavCandidate }) => ({
    alignSelf: "stretch",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",

    "& > .MuiButtonBase-root.MuiIconButton-root": {
      borderRadius: "unset",
      color: theme.palette.secondary.light,
      minHeight: "2.5em",
      padding: "0.5em",
      width: "2.5em",
    },

    "& > .MuiButtonBase-root.MuiIconButton-root:focus, & > .MuiButtonBase-root.MuiIconButton-root:focus-visible, & > .MuiButtonBase-root.MuiIconButton-root:focus-within":
      {
        backgroundColor: theme.palette.secondary.main,
        color: isFavCandidate
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
        outline: "none",
      },
  })
);

interface IStyledDivProps {
  isFavCandidate: boolean;
}

interface ILinkItemActionsProps {
  isFavorite: boolean;
  isFavoriteCandidate: boolean;
  label: string;
}

const LinkItemActions: FC<ILinkItemActionsProps> = ({
  isFavorite,
  isFavoriteCandidate,
  label,
}) => {
  const appDispatch = useAppDispatch();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  const removeItem = useCallback(() => {
    appDispatch(searchedActions.removeListedWord(label));
    appDispatch(favoriteActions.removeCandidate(label));
  }, [appDispatch, label]);

  const removeFavorite = useCallback(() => {
    appDispatch(favoriteActions.removeFavorite(label));
  }, [appDispatch, label]);

  const removeFavoriteHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      removeFavorite();
    },
    [removeFavorite]
  );

  const removeFavoriteKeyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      event.stopPropagation();
      event.key === "Enter" && removeFavorite();
    },
    [removeFavorite]
  );

  const deleteHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      removeItem();
    },
    [removeItem]
  );

  const deleteKeyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      event.stopPropagation();
      event.key === "Enter" && removeItem();
    },
    [removeItem]
  );

  return (
    <StyledDiv isFavCandidate={isFavoriteCandidate}>
      {isFavorite && (
        <IconButton
          aria-label="favorite icon"
          disableRipple
          onClick={removeFavoriteHandler}
          onKeyDown={removeFavoriteKeyHandler}
          role="button"
        >
          <StarBorderIcon fontSize="inherit" />
        </IconButton>
      )}
      {isSearchPage && (
        <IconButton
          aria-label="delete icon"
          disableRipple
          onClick={deleteHandler}
          onKeyDown={deleteKeyHandler}
          role="button"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
    </StyledDiv>
  );
};

export default LinkItemActions;
