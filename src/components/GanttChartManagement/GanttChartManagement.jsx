import React, { useState } from "react";
import styles from "./GanttChartManagement.module.css"; // Импорт модуля стилей компонента GanttChartManagement
import { Modal } from "../UI/Modal/Modal"; // Импорт компонента Modal из библиотеки пользовательских интерфейсов
import Select from "../UI/Select/Select"; // Импорт компонента Select из библиотеки пользовательских интерфейсов
import DateRangeProduction from "../DateRangeProduction/DateRangeProduction"; // Импорт компонента DateRangeProduction
import Checkbox from "../UI/Checkbox/Checkbox"; // Импорт компонента Checkbox из библиотеки пользовательских интерфейсов
import Button from "../UI/Button/Button"; // Импорт компонента Button из библиотеки пользовательских интерфейсов
import { addDays } from "date-fns"; // Импорт функции добавления дней к дате из библиотеки date-fns

/**
 * Компонент управления параметрами диаграммы Ганта.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.className - Классы стилей компонента.
 * @param {boolean} props.isNamesVisible - Чекбокс видимости наименований отделов.
 * @param {Function} props.setIsNamesVisible - Функция установки видимости наименований отделов.
 * @param {boolean} props.isLineVisible - Чекбокс видимости горизонтальной линии.
 * @param {Function} props.setIsLineVisible - Функция установки видимости горизонтальной линии.
 * @param {Function} props.setSelectedOption - Функция для обновления выбранной опции.
 * @param {Function} props.onDateRangeChange - Функция для обновления диапазона дат.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const GanttChartManagement = ({
  className,
  isNamesVisible,
  setIsNamesVisible,
  isLineVisible,
  setIsLineVisible,
  setSelectedOption,
  onDateRangeChange,
}) => {
  // Состояние для управления видимостью модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Состояние для управления состоянием чекбокса видимости наименований
  const [isChecked, setIsChecked] = useState(isNamesVisible);
  // Состояние для управления выбранной опцией локально
  const [selectedOptionLocal, setSelectedOptionLocal] = useState("По отделам");
  // Состояние для управления выбранным диапазоном дат
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  });

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
    setIsChecked(newValue); // Обновляем локальное состояние чекбокса
    setIsNamesVisible(newValue); // Обновляем состояние видимости наименований в родительском компоненте
  };

  /**
   * Обработчик изменения состояния чекбокса горизонтальной линии.
   * @param {boolean} newValue - Новое значение состояния чекбокса.
   */
  const handleLineCheckboxChange = (newValue) => {
    setIsLineVisible(newValue); // Обновляем состояние видимости горизонтальной линии в родительском компоненте
  };

  /**
   * Обработчик изменения выбранной опции в селекте.
   * @param {Object} selectedOption - Выбранная опция.
   */
  const handleSelectChange = (selectedOption) => {
    setSelectedOptionLocal(selectedOption.label); // Обновляем локальное состояние выбранной опции
    setSelectedOption(selectedOption.label); // Передаем выбранную опцию в родительский компонент
  };

  // Опции для селекта
  const options = [{ label: "По отделам" }, { label: "По статусу" }];

  /**
   * Обработчик изменения диапазона дат.
   * @param {Object} range - Объект с диапазоном дат.
   */
  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range); // Обновляем локальное состояние выбранного диапазона дат
    onDateRangeChange(range); // Передаем новый диапазон дат в родительский компонент
  };

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
          className={styles.titleModal}
        >
          <div className={styles.modalContent}>
            {/* Компонент выбора диапазона дат */}
            <div className={`${styles.dateRangeComp} m-b-10`}>
              <p className="m-r-10">Дата:</p>
              <DateRangeProduction
                initialStartDate={selectedDateRange.startDate} // Начальная дата для компонента DateRangeProduction
                initialEndDate={selectedDateRange.endDate} // Конечная дата для компонента DateRangeProduction
                onDateRangeChange={handleDateRangeChange} // Обработчик изменения диапазона дат
              />
            </div>
            {/* Компонент селекта для выбора отображения цвета */}
            <Select
              options={options}
              label="Цвет:"
              disabled={false}
              selectedOption={selectedOptionLocal}
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
