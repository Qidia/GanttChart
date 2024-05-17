import React, { useState, useEffect } from "react";
import styles from "./Checkbox.module.css";

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
        className="m-r-10"
      />
      {/* Текст метки */}
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;
