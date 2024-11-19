/** CUSTOM COMPONENTS */
import ListItem from "./ListItem";

/** COMPONENTS */
import MUIList from "@mui/material/List";

/** LIBRARIES */
import { styled } from "@mui/system";
import { type FC } from "react";

const StyledMUIList = styled(MUIList)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  listStyleType: "none",
  margin: 0,
  padding: "1em 0",

  [theme.breakpoints.up("sm")]: {
    columnGap: "0.5em",
    flexDirection: "row",
  },
}));

interface IListProps {
  words: string[];
}

const List: FC<IListProps> = ({ words }) => {
  return (
    <StyledMUIList>
      {words.map((word) => (
        <ListItem key={word} label={word} />
      ))}
    </StyledMUIList>
  );
};

export default List;
