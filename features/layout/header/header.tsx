import styles from "./header.module.scss";
import { Routes } from "@config/routes";
import { UIButton } from "../../ui/ui-kit-button";
import classNames from "classnames";

export function Header() {
  return (
    <header className={styles.header}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/logo-large.svg" alt="Prolog logo" />
      <nav className={classNames(styles.nav)}>
        <div className={styles["menu-icon"]}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <a href={Routes.home}>Home</a>
          </li>
          <li>
            <a href={Routes.products}>Products</a>
          </li>
          <li>
            <a href={Routes.documentation}>Documentation</a>
          </li>
          <li>
            <a href={Routes.pricing}>Pricing</a>
          </li>
        </ul>
      </nav>
      <div className={styles.dashboardButton}>
        <UIButton as="a" size="large" color="primary" href={Routes.projects}>
          Open Dashboard
        </UIButton>
      </div>
    </header>
  );
}
