import React from "react";
import styles from "./input.module.scss";
import classNames from "classnames";

// Define the interface
interface InputProps {
  variant: "small" | "medium" | "cell";
  className?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  name?: string;
  defaultValue?: string | number | readonly string[];
  id?: string;
}
// Implement the reusable component
const InputComponent: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  {
    value,
    placeholder,
    type,
    onChange,
    disabled,
    id,
    name,
    variant,
    defaultValue,
    className,
  },
  ref // ref should be the second argument and it's not part of props
) => {
  return (
    <input
      id={id}
      ref={ref}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      className={classNames(styles.root, className, styles[variant])}
      autoComplete="off"
      autoCorrect="off"
      disabled={disabled}
      defaultValue={defaultValue}
      name={name}
    />
  );
};

export default React.forwardRef(InputComponent);
