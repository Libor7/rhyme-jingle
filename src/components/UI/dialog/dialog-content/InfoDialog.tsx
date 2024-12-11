/** COMPONENTS */
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Paper, { type PaperProps } from "@mui/material/Paper";

/** ICONS */
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

/** LIBRARIES */
import { type FC } from "react";

/** STYLED COMPONENTS */
import { StyledDialogTitle } from "components/styled/StyledDialogTitle";
import { StyledDialogContent } from "components/styled/StyledDialogContent";
import { StyledDialogActions } from "components/styled/StyledDialogActions";
import { StyledParagraph } from "components/styled/StyledParagraph";

const PaperComponent = (props: PaperProps) => {
  return <Paper {...props} />;
};

interface IInfoDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  text: string;
  title: string;
}

const InfoDialog: FC<IInfoDialogProps> = ({
  onClose,
  onConfirm,
  text,
  title,
}) => {
  return (
    <Dialog open PaperComponent={PaperComponent} aria-labelledby="dialog-title">
      <StyledDialogTitle id="dialog-title">{title}</StyledDialogTitle>
      <StyledDialogContent>
        <StyledParagraph>{text}</StyledParagraph>
      </StyledDialogContent>
      <StyledDialogActions>
        <IconButton
          aria-label="close"
          disableRipple
          onClick={onClose}
          role="button"
          size="large"
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="confirm"
          disableRipple
          onClick={onConfirm}
          role="button"
          size="large"
        >
          <CheckIcon fontSize="inherit" />
        </IconButton>
      </StyledDialogActions>
    </Dialog>
  );
};

export default InfoDialog;
