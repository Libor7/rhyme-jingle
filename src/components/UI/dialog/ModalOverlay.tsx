/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  left: "50%",
  padding: "0.25em",
  position: "fixed",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 30,
}));

interface ModalOverlayProps {
  children: React.ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default ModalOverlay;
