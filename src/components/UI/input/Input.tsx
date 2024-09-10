/** LIBRARIES */
import { ChangeEvent, FC } from "react";

/** MODELS */
import { FlexDirections, FlexWrap, InputStyles, InputTypes } from "../../../models/input";
import { SearchField } from "../../../models/common";

/** STYLES */
import styles from "./Input.module.css";

interface InputContainerProps {
  direction?: FlexDirections;
  wrap?: boolean;
}

interface InputFieldProps {
  className: InputStyles;
  id: string;
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: SearchField;
  type?: InputTypes;
}

interface InputProps {
  containerProps: InputContainerProps;
  fieldProps: InputFieldProps;
}

const Input: FC<InputProps> = ({ containerProps, fieldProps }) => {
  const { className, id, label, type = InputTypes.SEARCH } = fieldProps;
  const { direction = FlexDirections.ROW, wrap = true } = containerProps;

  const flexWrap = wrap ? FlexWrap.WRAP : FlexWrap.NOWRAP;
  const containerClasses = `${styles.container} ${styles[direction]} ${styles[flexWrap]}`;
  const inputClasses = `${styles.input} ${styles[className]}`;

  return (
    <div className={containerClasses}>
      {label && <label htmlFor={id}>{label}</label>}
      <input {...fieldProps} className={inputClasses} type={type} />
    </div>
  );
};

export default Input;
