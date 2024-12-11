/** COMPONENTS */
import MUIBackdrop from "@mui/material/Backdrop";

/** LIBRARIES */
import { styled } from "@mui/system";

const StyledBackdrop = styled(MUIBackdrop)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  zIndex: 20,
}));

const Backdrop = () => {
  return <StyledBackdrop open />;
};

export default Backdrop;
