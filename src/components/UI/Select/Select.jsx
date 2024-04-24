import React, { useState, useEffect, useRef } from "react";
import styles from "./Select.module.css";

/**
 * Компонент выпадающего списка.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.options - Массив объектов-опций для выбора.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const Select = ({ options, disabled, label }) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние, отвечающее за открытие/закрытие списка
  const [selectedOption, setSelectedOption] = useState(""); // Состояние, отвечающее за выбранную опцию
  const selectRef = useRef(null); // Реф для доступа к DOM-элементу списка

  /**
   * Обработчик изменения значения ввода.
   * @param {Object} event - Событие изменения значения ввода.
   */
  const handleInputChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
    setSelectedOption(option.label);
    setIsOpen(false);
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
    setSelectedOption(options[0]?.label || "");

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleKeyPress);
    };
  }, [options]);

  return (
    <div className={styles.select} ref={selectRef}>
      {label && <div className='m-r-10'>{label}</div>}
      <input
        type="text"
        disabled={disabled}
        value={selectedOption}
        onChange={handleInputChange}
        onClick={handleToggle}
        readOnly
        className={`${styles.input} ${
          disabled ? styles.disabled : styles.enabled
        }`}
      />
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={styles.option}
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
