/** COMPONENTS */
import Input from "../input/Input";

/** LIBRARIES */
import { ChangeEvent } from "react";

/** MODELS */
import APP_CONTENT from "../../../models/constants";
import { InputStyles } from "../../../models/input";

/** OTHER */
import { searchedActions } from "../../../store/searched";
import { useAppDispatch } from "../../../store";

/** STYLES */
import styles from "./SearchField.module.css";

const SearchField = () => {
  const appDispatch = useAppDispatch();

  return (
    <section className={styles.container}>
      <Input
        containerProps={{}}
        fieldProps={{
          id: "all-words",
          className: InputStyles.SEARCH,
          placeholder: APP_CONTENT.SEARCHFIELD.PLACEHOLDER.SEARCHED,
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            appDispatch(
              searchedActions.setSearchedText(event.currentTarget.value)
            ),
        }}
      />
    </section>
  );
};

export default SearchField;
