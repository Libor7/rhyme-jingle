/** LIBRARIES */
import { ChangeEvent, FC } from "react";

/** MODELS */
import {
  FlexDirection,
  FlexWrap,
  Input as InputEnum,
} from "../../../models/input";

/** STYLES */
import styles from "./Input.module.css";

interface InputContainerProps {
  direction?: FlexDirection;
  wrap?: boolean;
}

interface InputFieldProps {
  className: InputEnum;
  id: string;
  label?: string;
  max?: number;
  min?: 1;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputEnum;
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
    type = InputEnum.SEARCH,
    ...rest
  } = fieldProps;
  const { direction = FlexDirection.ROW, wrap = true } = containerProps;

  const flexWrap = wrap ? FlexWrap.WRAP : FlexWrap.NOWRAP;
  const containerClasses = `${styles.container} ${styles[direction]} ${styles[flexWrap]}`;
  const inputClasses = `${styles.input} ${styles[className]}`;

  return (
    <div className={containerClasses}>
      {label && <label htmlFor={id}>{label}</label>}
      <input {...rest} className={inputClasses} type={type} />
    </div>
  );
};

export default Input;
