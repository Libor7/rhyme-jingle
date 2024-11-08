/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC } from "react";

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  left: "50%",
  padding: "0.25em",
  position: "fixed",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 30,
}));

interface IModalOverlayProps {
  children: React.ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default ModalOverlay;
