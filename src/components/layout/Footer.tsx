/** CUSTOM COMPONENTS */
import LinkItem from "../UI/LinkItem";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

/** MODELS */
import { Link } from "../../models/link";

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

interface FooterProps {
  links: Link[];
}

const Footer: FC<FooterProps> = ({ links }) => {
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
