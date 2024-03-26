import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./select.module.scss";

export type SelectProps = {
  options: string[];
  onSelect: (value: string | undefined) => void;
  placeholder: string;
  defaultOption?: string | undefined;
  disabled?: boolean;
  icon?: string;
  label?: string;
  hint?: string;
  error?: string;
  width?: string;
};

export function UISelect({
  options,
  onSelect,
  placeholder,
  defaultOption,
  disabled,
  icon,
  label,
  error,
  hint,
  width,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    } else if (defaultOption === undefined) {
      setSelectedOption(null);
    }
  }, [defaultOption]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedOption(null);
    onSelect(undefined);
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
            : width
              ? {
                  width: width,
                }
              : {}
        }
      >
        <span className={selectedOption === null ? styles.empty : ""}>
          {selectedOption || placeholder}
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
          <li className={styles.placeholder} onClick={() => handleReset()}>
            {placeholder}
          </li>
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
