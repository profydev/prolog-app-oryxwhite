import styles from "./loading-spinner.module.scss";

export function Spinner() {
  return (
    <div className={styles.spinner} data-cy={"spinner"}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/spinner.svg" alt="spinner" />
    </div>
  );
}
