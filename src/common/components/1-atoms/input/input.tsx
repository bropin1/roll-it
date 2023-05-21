import React from "react";
import styles from "./input.module.scss";

// Define the interface
interface InputProps {
  value?: string;
  placeholder?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  name?: string;
  id?: string;
}
// Implement the reusable component
const InputComponent: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  { value, placeholder, type, onChange, disabled, id, name },
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
      className={styles.root}
      autoComplete="off"
      autoCorrect="off"
      disabled={disabled}
      name={name}
    />
  );
};

export default React.forwardRef(InputComponent);
