/** LIBRARIES */
import { ChangeEvent, FC } from "react";

/** MODELS */
import {
  FlexDirections,
  FlexWrap,
  InputStyles,
  InputTypes,
} from "../../../models/input";

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
  max?: number;
  min?: 1;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputTypes;
  value?: number | string;
}

interface InputProps {
  containerProps: InputContainerProps;
  fieldProps: InputFieldProps;
}

const Input: FC<InputProps> = ({ containerProps, fieldProps }) => {
  const {
    className,
    id,
    label,
    max,
    min,
    type = InputTypes.SEARCH,
  } = fieldProps;
  const { direction = FlexDirections.ROW, wrap = true } = containerProps;

  const flexWrap = wrap ? FlexWrap.WRAP : FlexWrap.NOWRAP;
  const containerClasses = `${styles.container} ${styles[direction]} ${styles[flexWrap]}`;
  const inputClasses = `${styles.input} ${styles[className]}`;

  return (
    <div className={containerClasses}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        {...fieldProps}
        className={inputClasses}
        type={type}
        max={max}
        min={min}
      />
    </div>
  );
};

export default Input;
