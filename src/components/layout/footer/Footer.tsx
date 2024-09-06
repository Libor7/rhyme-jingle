/** COMPONENTS */
import LinkItem from "../../UI/link-item/LinkItem";

/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import { Links } from "../../../models/link";

/** STYLES */
import styles from "./Footer.module.css";

interface FooterProps {
  links: Links[];
}

const Footer: FC<FooterProps> = ({ links }) => {
  return (
    <footer className={styles.footer}>
      <ul>
        {links.map((link) => (
          <LinkItem key={link.path} {...link} />
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
