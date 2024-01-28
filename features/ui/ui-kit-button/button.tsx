import classNames from "classnames";
import styles from "./button.module.scss";

export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  as: "button" | "a";
  href?: string;
  disabled?: boolean;
  size: "small" | "medium" | "large" | "xlarge";
  color:
    | "primary"
    | "secondary"
    | "gray"
    | "empty"
    | "empty-gray"
    | "error"
    | "empty-error";
  icon?: boolean;
  iconSrc?: string;
  iconAlt?: string;
  iconPosition?: "leading" | "trailing" | "only";
  manualStyle?: React.CSSProperties;
};

export function UIButton({
  children,
  onClick,
  as = "button",
  href,
  disabled = false,
  size = "medium",
  color = "primary",
  icon = false,
  iconSrc,
  iconAlt,
  iconPosition,
  manualStyle,
}: ButtonProps) {
  if (as === "button") {
    return (
      <button
        className={classNames(
          styles.button,
          styles[size],
          styles[color],
          disabled ? styles.disabled : "",
          iconPosition === "only" ? styles["icon-only"] : "",
        )}
        style={manualStyle}
        disabled={disabled}
        onClick={onClick}
      >
        {icon && iconPosition === "leading" && (
          <span className={classNames(styles.icon, styles.leading)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {<img src={iconSrc} alt={iconAlt} />}
          </span>
        )}
        {children && (
          <span className={`${iconPosition === "only" ? styles.hidden : ""}`}>
            {children}
          </span>
        )}
        {icon && iconPosition === "trailing" && (
          <span className={classNames(styles.icon, styles.trailing)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {<img src={iconSrc} alt={iconAlt} />}
          </span>
        )}
        {icon && iconPosition === "only" && (
          <span className={classNames(styles.icon, styles.only)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {<img src={iconSrc} alt={iconAlt} />}
          </span>
        )}
      </button>
    );
  } else if (as === "a") {
    return (
      <a
        className={classNames(
          styles.button,
          styles[size],
          styles[color],
          disabled ? styles.disabled : "",
        )}
        href={href}
      >
        {children}
      </a>
    );
  }
}
