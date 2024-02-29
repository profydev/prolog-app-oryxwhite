import { useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./checkbox.module.scss";

export type CheckboxProps = {
  indeterminate?: boolean;
  label?: string;
  disabled?: boolean;
  onChange: () => void;
  checked: boolean;
  size: "small" | "medium";
};

export function UICheckbox({
  checked,
  disabled = false,
  indeterminate = false,
  label,
  size,
  onChange,
}: CheckboxProps) {
  const cRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cRef.current) {
      cRef.current.indeterminate = indeterminate;
    }
  }, [cRef, indeterminate]);

  return (
    <div className={styles["checkbox-content"]}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={cRef}
        className={classNames(styles.checkbox, styles[size])}
      />
      {label && (
        <span
          className={classNames(
            styles.label,
            styles[size],
            disabled && styles.disabled,
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
