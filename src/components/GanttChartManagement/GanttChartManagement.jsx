import React, { useState } from "react";
import { Modal } from "../UI/Modal/Modal";
import Select from "../UI/Select/Select";
import DateRangeProduction from "../DateRangeProduction/DateRangeProduction";
import Checkbox from "../UI/Checkbox/Checkbox";
import styles from "./GanttChartManagement.module.css";

const GanttChartManagement = ({
  className,
  isNamesVisible,
  setIsNamesVisible,
  isLineVisible,
  setIsLineVisible,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(isNamesVisible);
  const [selectedOption, setSelectedOption] = useState("По подразделениям");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (newValue) => {
    setIsChecked(newValue);
    setIsNamesVisible(newValue);
  };

  const handleLineCheckboxChange = (newValue) => {
    setIsLineVisible(newValue);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption.label);
    console.log(`Выбрали ${selectedOption.label}`);
  };

  const options = [
    { label: "По подразделениям" },
    { label: "По статусу" },
    { label: "По дисциплине потока" },
  ];

  return (
    <>
      <div className={className}>
        <button onClick={openModal} className={styles.btnOpenModal}>
          <svg
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <g fill="none" fillRule="nonzero">
              <path d="m2 16h28"></path>
              <path d="m2 24h28"></path>
              <path d="m2 8h28"></path>
            </g>
          </svg>
        </button>
        <Modal
          isOpen={isModalOpen}
          titleModal="Панель управления"
          onClose={closeModal}
        >
          <div className={styles.modalContent}>
            <div className={`${styles.dateRangeComp} m-b-10`}>
              <p className="m-r-10">Дата:</p>
              <DateRangeProduction />
            </div>
            <Select
              options={options}
              label="Цвет:"
              disabled={false}
              selectedOption={selectedOption}
              onSelectChange={handleSelectChange}
              className="m-b-10"
            />
            <Checkbox
              label="Наименования"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className={`${styles.checkbox} m-b-10`}
            />
            <Checkbox
              label="Легенда"
              onChange={() => {}}
              className={`${styles.checkbox} m-b-10`}
            />

            <Checkbox
              label="Горизонтальная линия"
              checked={isLineVisible}
              onChange={handleLineCheckboxChange}
              className={`${styles.checkbox} m-b-10`}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default GanttChartManagement;
