import React, { useState } from "react";
import styles from "./HorizontalLine.module.css";

/**
 * Компонент рисующий горизонтальную линии.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const HorizontalLine = () => {
  // Состояние для отслеживания нахождения курсора мыши внутри компонента
  const [isMouseInside, setIsMouseInside] = useState(false);
  // Состояние для хранения позиции курсора мыши
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Обработчик события движения мыши
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();

    // Проверка, находится ли курсор мыши внутри компонента
    if (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    ) {
      setMousePosition({ x: clientX - rect.left, y: clientY - rect.top });
      setIsMouseInside(true);
    } else {
      setIsMouseInside(false);
    }
  };

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      {/* Рендер линии только при нахождении курсора мыши внутри компонента */}
      {isMouseInside && (
        <div className={styles.line} style={{ top: mousePosition.y }} />
      )}
    </div>
  );
};

export default HorizontalLine;
