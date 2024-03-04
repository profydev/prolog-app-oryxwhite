import styles from "./input.module.scss";
import classNames from "classnames";

export type InputProps = {
  placeholder: string;
  onChange: (e: string) => void;
  disabled?: boolean;
  icon?: string;
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
};

export function UIInput({
  placeholder,
  onChange,
  disabled,
  icon,
  label,
  hint,
  error,
  errorMessage,
}: InputProps) {
  return (
    <div className={styles["input-container"]}>
      {label && <span className={styles.label}>{label}</span>}
      <div>
        <input
          placeholder={placeholder}
          disabled={disabled}
          type="text"
          className={classNames(styles.input, error && styles.error)}
          onChange={(e) => onChange(e.target.value)}
          style={
            icon
              ? {
                  background: `url(${icon}) no-repeat 14px 9.5px`,
                  backgroundSize: "20px",
                  paddingLeft: "42px",
                }
              : {}
          }
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {error && (
          <img
            src="/icons/alert-circle.svg"
            alt="error icon"
            className={styles["error-icon"]}
          ></img>
        )}
      </div>
      {hint && <span className={styles.hint}>{hint}</span>}
      {errorMessage && (
        <span className={styles["error-message"]}>{errorMessage}</span>
      )}
    </div>
  );
}
