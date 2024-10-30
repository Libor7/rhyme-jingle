/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

/** MODELS */
import { Icon as IconEnum, IconStyleType } from "../../models/icon";

const StyledItalic = styled("i")<StyledItalicProps>(
  ({ theme, isFav, type }) => ({
    alignSelf: type === "header" ? "center" : "auto",
    fontSize: type === "icon" ? "unset" : "2em",
    padding: type === "header" ? "0.5em" : type === "icon" ? "1.25em" : "unset",

    "&:focus, &:focus-visible, &:focus-within": {
      backgroundColor: theme.palette.secondary.main,
      color: isFav ? theme.palette.primary.light : theme.palette.primary.dark,
      outline: "none",
    },
  })
);

interface StyledItalicProps {
  isFav: boolean | undefined;
  type: IconStyleType;
}

interface IconProps {
  alt: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  iconClass: IconEnum;
  iconStyle?: IconStyleType;
  isFavorite?: boolean;
}

const Icon: FC<IconProps> = ({
  iconClass,
  iconStyle = "button",
  isFavorite,
  ...rest
}) => {
  const classes = `fas ${iconClass}`;
  const hasTabIndex = iconClass === IconEnum.TRASH ? 0 : undefined;

  return (
    <StyledItalic
      isFav={isFavorite}
      tabIndex={hasTabIndex}
      type={iconStyle}
      className={classes}
      {...rest}
    />
  );
};

export default Icon;
