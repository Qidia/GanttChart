import React, { useState, useEffect, useRef } from "react";
import styles from "./Select.module.css";

/**
 * Компонент выпадающего списка.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.options - Массив объектов-опций для выбора.
 * @param {Function} props.onSelectChange - Обработчик изменения выбранной опции.
 * @param {String} props.selectedOption - Начально выбранная опция.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const Select = ({
  options,
  disabled,
  label,
  onSelectChange,
  className,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия списка
  const [currentOption, setCurrentOption] = useState(selectedOption); // Состояние для текущей выбранной опции
  const selectRef = useRef(null); // Ссылка на DOM-элемент компонента

  /**
   * Обработчик открытия/закрытия списка.
   */
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Обработчик клика по опции списка.
   * @param {Object} option - Выбранная опция.
   */
  const handleOptionClick = (option) => {
    if (option.label === currentOption) {
      setIsOpen(false);
      return;
    }

    setCurrentOption(option.label);
    setIsOpen(false);
    if (onSelectChange) {
      onSelectChange(option);
    }
  };

  /**
   * Обработчик клика вне компонента для закрытия списка.
   * @param {Object} event - Событие клика.
   */
  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  /**
   * Обработчик нажатия клавиши.
   * @param {Object} event - Событие нажатия клавиши.
   */
  const handleKeyPress = (event) => {
    switch (event.key) {
      case "Escape":
        setIsOpen(false);
        break;
      case "Enter":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  /**
   * Эффект для установки начального значения и добавления слушателя событий при загрузке компонента.
   */
  useEffect(() => {
    document.addEventListener("click", handleClickOutside); // Добавляем слушатель клика для закрытия списка по клику вне
    document.addEventListener("keydown", handleKeyPress); // Добавляем слушатель нажатия клавиши для закрытия списка при нажатии Esc

    return () => {
      document.removeEventListener("click", handleClickOutside); // Удаляем слушатель клика при размонтировании компонента
      document.removeEventListener("keydown", handleKeyPress); // Удаляем слушатель нажатия клавиши при размонтировании компонента
    };
  }, []); // Запускаем только при монтировании компонента

  useEffect(() => {
    setCurrentOption(selectedOption); // Установка текущей выбранной опции при изменении свойства
  }, [selectedOption]); // Запускаем только при изменении свойства selectedOption

  return (
    <div className={`${styles.select} ${className}`} ref={selectRef}>
      {label && <div className="m-r-10">{label}</div>}

      {/* Ввод, отображающий текущую выбранную опцию */}
      <input
        type="text"
        disabled={disabled}
        value={currentOption}
        onClick={handleToggle}
        readOnly // Запрет на редактирование значения
        className={`${styles.input} ${
          disabled ? styles.disabled : styles.enabled
        }`}
      />

      {/* Отображение списка опций при isOpen === true */}
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`m-b-4 ${styles.option} ${
                option.label === currentOption ? styles.selectedOption : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
