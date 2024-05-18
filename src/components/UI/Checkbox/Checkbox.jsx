import React, { useState, useEffect } from "react";
import styles from "./Checkbox.module.css";

/**
 * Компонент чекбокса.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.label - Текст метки чекбокса.
 * @param {boolean} props.checked - Состояние чекбокса.
 * @param {Function} props.onChange - Обработчик изменения состояния чекбокса.
 * @param {string} props.className - Классы стилей чекбокса.
 * @returns {JSX.Element} - Элемент JSX чекбокса.
 */
const Checkbox = ({ label, checked, onChange, className }) => {
  // Состояние для отслеживания состояния чекбокса
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // Обработчик изменения состояния чекбокса
  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange && onChange(newValue); // Вызов функции обратного вызова с новым значением
  };

  return (
    <label className={`${styles.checkbox} ${className}`}>
      {/* Чекбокс */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className={`${styles.input} m-r-10`}
      />
      <span className={styles.customCheckbox} />
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;
