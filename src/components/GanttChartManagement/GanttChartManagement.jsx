import React from "react";
import { Modal } from "../UI/Modal/Modal";
import Select from "../UI/Select/Select";
import DateRangeProduction from "../DateRangeProduction/DateRangeProduction";
import Checkbox from "../UI/Checkbox/Checkbox";

import styles from "./GanttChartManagement.module.css";

const GanttChartManagement = ({
  className,
  isNamesVisible,
  setIsNamesVisible,
}) => {
  // Состояния модального окна и чекбокса
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  // Функция открытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Функция закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (newValue) => {
    setIsChecked(newValue);
    setIsNamesVisible(newValue); // Обновление видимости имен
  };

  // Определение вариантов для компонента Select
  const options = [
    { label: "По подразделениям" },
    { label: "По статусу" },
    { label: "По дисциплине потока" },
  ];

  return (
    <>
      <div className={className}>
        {/* Кнопка открытия модального окна */}
        <button onClick={openModal} className={styles.btnOpenModal}>
          <svg
            viewBox="0 0 32 32"
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
        {/* Модальное окно */}
        <Modal
          isOpen={isModalOpen}
          titleModal="Управление"
          onClose={closeModal}
        >
          <div className={styles.modalContent}>
            {/* Компонент выбора диапазона дат */}
            <div className={styles.dateRangeComp}>
              <p className="m-r-10">Дата:</p>
              <DateRangeProduction />
            </div>
            {/* Компонент выбора опции из списка */}
            <Select options={options} label="Цвет:" disabled={false} />
            {/* Чекбокс для изменения видимости имен */}
            <Checkbox
              label="Наименования"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {/* Прочие чекбоксы (неактивные) */}
            <Checkbox label="Легенда" checked={isChecked} onChange={() => {}} />
            <Checkbox label="Линия" checked={isChecked} onChange={() => {}} />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default GanttChartManagement;
