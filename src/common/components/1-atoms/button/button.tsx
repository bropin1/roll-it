import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "default" | "text";
  onClick?: () => void; // onClick function - Button responsibility is to call this function, not to decide what happens
  children?: React.ReactNode; // Allows any kind of content
  className?: string; // Optional classname for extending the component's styling
  disabled?: boolean; // Optional disabled state
}

// Button component
export default function Button({
  variant,
  onClick,
  children,
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        className,
        styles.root,
        styles[variant],
        disabled ? styles.disabled : ""
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
