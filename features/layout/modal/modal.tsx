import styles from "./modal.module.scss";
import { UIButton } from "@features/ui";

interface ModalProps {
  onClose: () => void;
  closeModal: () => void;
}

export function Modal({ onClose, closeModal }: ModalProps) {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleClose}>
      <div className={styles.modal}>
        <div className={styles["modal-content"]}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/mail.svg" alt="mail" />
          <div>
            <h2>Contact Us Via Email</h2>
            <p>
              Any questions? Send us an email at <br></br> prolog@profy.dev. We
              usually answer within 24 <br></br> hours.
            </p>
          </div>
        </div>
        <div className={styles.buttons}>
          <UIButton
            onClick={closeModal}
            as="button"
            color="gray"
            size="large"
            manualStyle={{ width: 170 }}
          >
            Cancel
          </UIButton>
          <UIButton
            href="mailto:support@profy.com"
            as="a"
            color="primary"
            size="large"
            manualStyle={{ width: 170 }}
          >
            Open Email App
          </UIButton>
        </div>
      </div>
    </div>
  );
}
