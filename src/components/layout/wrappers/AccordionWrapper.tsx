/** COMPONENTS */
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

/** ICONS */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC, type PropsWithChildren, useState } from "react";

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.primary.main,
  margin: "0 1em",

  "&:last-of-type": {
    borderRadius: 0,
  },

  "& > .MuiAccordion-heading > .MuiButtonBase-root.MuiAccordionSummary-root:hover":
    {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },

  "& > .MuiAccordion-heading > .MuiButtonBase-root.MuiAccordionSummary-root.Mui-focusVisible":
    {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },

  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.primary.main,
  },

  "& > .MuiAccordion-heading:hover .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.primary.contrastText,
  },

  "& > .MuiAccordion-heading > .MuiButtonBase-root.MuiAccordionSummary-root.Mui-focusVisible > .MuiAccordionSummary-expandIconWrapper":
    {
      color: theme.palette.primary.contrastText,
    },

  "& > .MuiCollapse-root:focus-visible": {
    outline: "none",
  },

  "& > .MuiCollapse-root > .MuiCollapse-wrapper:focus-visible": {
    outline: "none",
  },

  "& > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner:focus-visible":
    {
      outline: "none",
    },

  "& > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region:focus-visible":
    {
      outline: "none",
    },

  "& > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root:focus-visible":
    {
      outline: "none",
    },
}));

interface AccordionWrapperProps {
  label: string;
}

const AccordionWrapper: FC<PropsWithChildren<AccordionWrapperProps>> = ({
  children,
  label,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <StyledAccordion
      expanded={open}
      onChange={() => setOpen((prevState) => !prevState)}
      sx={{ boxShadow: 4 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="accordion-summary"
        id="accordion-header"
      >
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};

export default AccordionWrapper;
