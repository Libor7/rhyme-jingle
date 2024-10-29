/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

/** MODELS */
import { Icon as IconEnum, IconStyleType } from "../../models/icon";

const StyledItalic = styled("i")<StyledItalicProps>(({ type }) => ({
  alignSelf: type === "header" ? "center" : "auto",
  fontSize: type === "icon" ? "unset" : "2em",
  padding: type === "header" ? "0.5em" : type === "icon" ? "1.25em" : "unset",
}));

interface StyledItalicProps {
  type: IconStyleType;
}

interface IconProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  iconClass: IconEnum;
  iconStyle?: IconStyleType;
}

const Icon: FC<IconProps> = ({ onClick, iconClass, iconStyle = "button" }) => {
  const classes = `fas ${iconClass}`;

  return (
    <StyledItalic type={iconStyle} className={classes} onClick={onClick} />
  );
};

export default Icon;
