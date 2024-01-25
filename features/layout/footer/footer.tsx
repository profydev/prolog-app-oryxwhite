import styles from "./footer.module.scss";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export function Footer() {
  return (
    <div className={styles.footer} data-cy="footer">
      <div className={styles.version} data-cy="version">
        Version: {publicRuntimeConfig?.version}
      </div>
      <div className={styles.footerLinks} data-cy="links">
        <a href="#">Docs</a>
        <a href="#">API</a>
        <a href="#">Help</a>
        <a href="#">Community</a>
      </div>
      <div>
        <img src="/icons/logo-footer.svg" alt="Logo" />
      </div>
    </div>
  );
}
