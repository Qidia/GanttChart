import React, { useState } from "react";
import styles from "./GanttChartManagement.module.css";
import { Modal } from "../UI/Modal/Modal";
import Select from "../UI/Select/Select";
import DateRangeProduction from "../DateRangeProduction/DateRangeProduction";
import Checkbox from "../UI/Checkbox/Checkbox";
import Button from "../UI/Button/Button";

/**
 * Компонент управления параметрами диаграммы Ганта.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.className - Классы стилей компонента.
 * @param {boolean} props.isNamesVisible - Чекбокс видимости наименований отделов.
 * @param {Function} props.setIsNamesVisible - Функция установки видимости наименований отделов.
 * @param {boolean} props.isLineVisible - Чекбокса видимости горизонтальной линии.
 * @param {Function} props.setIsLineVisible - Функция установки видимости горизонтальной линии.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
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

  /**
   * Функция открытия модального окна.
   */
  const openModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Функция закрытия модального окна.
   */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Обработчик изменения состояния чекбокса показа наименований.
   * @param {boolean} newValue - Новое значение состояния чекбокса.
   */
  const handleCheckboxChange = (newValue) => {
    setIsChecked(newValue);
    setIsNamesVisible(newValue);
  };

  /**
   * Обработчик изменения состояния чекбокса горизонтальной линии.
   * @param {boolean} newValue - Новое значение состояния чекбокса.
   */
  const handleLineCheckboxChange = (newValue) => {
    setIsLineVisible(newValue);
  };

  /**
   * Обработчик изменения выбранной опции в селекте.
   * @param {Object} selectedOption - Выбранная опция.
   */
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption.label);
    console.log(`Выбрали ${selectedOption.label}`);
  };

  // Опции для селекта
  const options = [
    { label: "По подразделениям" },
    { label: "По статусу" },
    { label: "По дисциплине потока" },
  ];

  return (
    <>
      <div className={className}>
        {/* Кнопка для открытия модального окна */}
        <Button onClick={openModal} className={styles.btnOpenModal}>
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
        </Button>
        {/* Модальное окно для управления параметрами графика */}
        <Modal
          isOpen={isModalOpen}
          titleModal="Панель управления"
          onClose={closeModal}
        >
          <div className={styles.modalContent}>
            {/* Компонент выбора диапазона дат */}
            <div className={`${styles.dateRangeComp} m-b-10`}>
              <p className="m-r-10">Дата:</p>
              <DateRangeProduction />
            </div>
            {/* Компонент селекта для выбора отображения цвета */}
            <Select
              options={options}
              label="Цвет:"
              disabled={false}
              selectedOption={selectedOption}
              onSelectChange={handleSelectChange}
              className="m-b-10"
            />
            {/* Чекбокс для видимости наименований отделов */}
            <Checkbox
              label="Наименования"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className={`${styles.checkbox} m-b-10`}
            />
            {/* Чекбокс для видимости горизонтальной линии */}
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
