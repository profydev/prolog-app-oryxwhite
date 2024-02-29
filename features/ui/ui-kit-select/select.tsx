import React, { useState } from "react";
import classNames from "classnames";
import styles from "./select.module.scss";

export type SelectProps = {
  options: string[];
  onSelect: (value: string) => void;
  disabled?: boolean;
  icon?: string;
  label?: string;
  hint?: string;
  error?: string;
};

export function UISelect({
  options,
  onSelect,
  disabled,
  icon,
  label,
  error,
  hint,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      {label && <div className={styles.label}>{label}</div>}
      <button
        disabled={disabled}
        className={classNames(styles["selected-option"], error && styles.error)}
        onClick={() => setIsOpen(!isOpen)}
        style={
          icon
            ? {
                background: `url(${icon}) no-repeat 14px 9.5px`,
                backgroundSize: "20px",
                paddingLeft: "42px",
              }
            : {}
        }
      >
        <span className={selectedOption === null ? styles.empty : ""}>
          {selectedOption || "Select an option"}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/selecticon.svg"
          alt="select arrow"
          className={classNames(styles.arrow, isOpen && styles.open)}
        ></img>
      </button>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
      {hint && !isOpen && !error && <span className={styles.hint}>{hint}</span>}
      {error && !isOpen && (
        <span className={styles["error-message"]}>{error}</span>
      )}
    </div>
  );
}
