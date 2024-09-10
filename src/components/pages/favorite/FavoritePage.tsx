/** COMPONENTS */
import Input from "../../UI/input/Input";

/** MODELS */
import { InputStyles } from "../../../models/input";
import { SearchField } from "../../../models/common";

const FavoritePage = () => {
  return (
    <>
      <Input
        containerProps={{}}
        fieldProps={{
          // label: "Testing",
          id: "test",
          className: InputStyles.SEARCH,
          placeholder: SearchField.PLACEHOLDER_FAVORITE,
          onChange: () => {},
        }}
      />
    </>
  );
};

export default FavoritePage;
