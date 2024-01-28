// import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import { Header } from "../features/layout/header/index";
import { Modal } from "../features/layout/modal/index";
import { useState } from "react";

const IssuesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Header />
      <button className={styles.contactButton} onClick={openModal}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default IssuesPage;
