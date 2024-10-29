/** CUSTOM COMPONENTS */
import ListItem from "./ListItem";

/** COMPONENTS */
import MUIList from "@mui/material/List";

/** LIBRARIES */
import { styled } from "@mui/system";
import { FC } from "react";

const StyledMUIList = styled(MUIList)(() => ({
  listStyleType: "none",
  margin: 0,
  padding: "1em 0",
}));

interface ListProps {
  words: string[];
}

const List: FC<ListProps> = ({ words }) => {
  return (
    <StyledMUIList>
      {words.map((word) => (
        <ListItem key={word} label={word} />
      ))}
    </StyledMUIList>
  );
};

export default List;
