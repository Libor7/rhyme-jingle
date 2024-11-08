/** CUSTOM COMPONENTS */
import LinkItem from "../UI/LinkItem";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC } from "react";

/** MODELS */
import { type ILink } from "../../models/link";

const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const StyledUl = styled("ul")(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "1em",
  justifyContent: "center",
  listStyleType: "none",
  margin: "1em",
  padding: 0,
}));

interface IFooterProps {
  links: ILink[];
}

const Footer: FC<IFooterProps> = ({ links }) => {
  return (
    <StyledFooter>
      <StyledUl>
        {links.map((link) => (
          <LinkItem key={link.path} {...link} />
        ))}
      </StyledUl>
    </StyledFooter>
  );
};

export default Footer;
