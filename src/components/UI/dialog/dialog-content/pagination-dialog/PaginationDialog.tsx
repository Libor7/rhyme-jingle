import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import { FC } from "react";

interface PaginationDialogProps {
  onDialogClose: () => void;
  open: boolean;
}

const PaperComponent = (props: PaperProps) => {
  return <Paper {...props} />;
};

const PaginationDialog: FC<PaginationDialogProps> = ({
  onDialogClose,
  open,
}) => {
  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="dialog-title">
        Subscribe
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onDialogClose}>
          Cancel
        </Button>
        <Button onClick={() => {}}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaginationDialog;
