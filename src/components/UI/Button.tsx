/** COMPONENTS */
import MUIButton from "@mui/material/Button";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC, type PropsWithChildren, useEffect } from "react";

/** OTHER */
import { useAppDispatch } from "../../store";
import { searchedActions } from "../../store/searched";

const StyledButton = styled(MUIButton)<IStyledButtonProps>(
  ({ theme, marked }) => ({
    backgroundColor: marked
      ? theme.palette.primary.light
      : theme.palette.primary.main,
    borderRadius: "unset",
    fontSize: "1.5em",
    height: "2.5em",
    minWidth: "unset",
    width: "2.5em",

    "&:hover, &:focus, &:focus-visible, &:focus-within": {
      backgroundColor: marked
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    },
  })
);

interface IButtonProps {
  isMarked: boolean;
  length: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface IStyledButtonProps {
  marked: number;
}

const Button: FC<PropsWithChildren<IButtonProps>> = ({
  isMarked,
  length,
  onClick,
}) => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      appDispatch(searchedActions.removeLengthFilter(length));
    };
  }, [appDispatch, length]);

  return (
    <StyledButton
      marked={isMarked ? 1 : 0}
      disableElevation
      disableRipple
      onClick={onClick}
      size="large"
      variant="contained"
    >
      {length}
    </StyledButton>
  );
};

export default Button;
