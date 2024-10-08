/** COMPONENTS */
import Input from "../../UI/input/Input";

/** MODELS */
import APP_CONTENT from "../../../models/constants";
import { InputStyles } from "../../../models/input";

const FavoritePage = () => {
  return (
    <Input
      containerProps={{}}
      fieldProps={{
        id: "test",
        className: InputStyles.SEARCH,
        placeholder: APP_CONTENT.SEARCHFIELD.PLACEHOLDER.FAVORITE,
        onChange: () => {},
      }}
    />
  );
};

export default FavoritePage;
