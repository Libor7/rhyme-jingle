/** COMPONENTS */
import MUIBackdrop from "@mui/material/Backdrop";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC } from "react";

const StyledBackdrop = styled(MUIBackdrop)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  zIndex: 20,
}));

interface IBackdropProps {
  open: boolean;
}

const Backdrop: FC<IBackdropProps> = ({ open }) => {
  return <StyledBackdrop open={open} />;
};

export default Backdrop;
