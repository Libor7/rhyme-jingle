/** COMPONENTS */
import DialogTitle from "@mui/material/DialogTitle";

/** LIBRARIES */
import { styled } from "@mui/system";

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.primary.main,
  fontWeight: 600,
  textAlign: "center",
}));
