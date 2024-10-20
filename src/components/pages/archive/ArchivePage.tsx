/** COMPONENTS */
import Input from "../../UI/input/Input";

/** MODELS */
import APP_CONTENT from "../../../models/constants";
import { Input as InputEnum } from "../../../models/input";

const ArchivePage = () => {
  return (
    <Input
      containerProps={{}}
      fieldProps={{
        id: "test",
        className: InputEnum.SEARCH,
        placeholder: APP_CONTENT.SEARCHFIELD.PLACEHOLDER.ARCHIVED,
        onChange: () => {},
      }}
    />
  );
};

export default ArchivePage;
