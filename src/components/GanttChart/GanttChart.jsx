import React, { useState } from "react";
import { Modal } from "../UI/Modal/Modal";
import styles from "./GanttChart.module.css";
import Select from "../UI/Select/Select";
import DateRangeProduction from "../DateRangeProduction/DateRangeProduction";

const GanttChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Модальное окно
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Select
  const options = [
    { label: "По подразделениям" },
    { label: "По статусу" },
    { label: "По дисциплине потока" },
  ];

  return (
    <>
      <button onClick={openModal} className={styles.btnOpenModal}>
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <g fill="none" fill-rule="nonzero">
            <path d="m2 16h28"></path>
            <path d="m2 24h28"></path>
            <path d="m2 8h28"></path>
          </g>
        </svg>
      </button>
      <Modal isOpen={isModalOpen} titleModal="Управление" onClose={closeModal}>
        <div className={styles.modalContent}>
          <div className={styles.dateRangeComp} >
            <p className="m-r-10">Дата:</p>
            <DateRangeProduction/>
          </div>
          <Select options={options} label="Цвет:" disabled={false} />
          <p>Наименования</p>
          <p>Легенда</p>
          <p>Линия</p>
        </div>
      </Modal>
    </>
  );
};

export default GanttChart;
