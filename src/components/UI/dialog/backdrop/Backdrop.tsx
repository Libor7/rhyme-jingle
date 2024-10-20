/** COMPONENTS */
import MUIBackdrop from "@mui/material/Backdrop";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

const StyledBackdrop = styled(MUIBackdrop)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  zIndex: 20,
}));

interface BackdropProps {
  open: boolean;
}

const Backdrop: FC<BackdropProps> = ({ open }) => {
  return <StyledBackdrop open={open} />;
};

export default Backdrop;
