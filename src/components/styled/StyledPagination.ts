/** COMPONENTS */
import Pagination from "@mui/material/Pagination";

/** LIBRARIES */
import { styled } from "@mui/system";

export const StyledPagination = styled(Pagination)(() => ({
  display: "flex",
  justifyContent: "center",

  "& > .MuiPagination-ul": {
    justifyContent: "center",
  },
}));
