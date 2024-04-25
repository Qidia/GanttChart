import React, { useState } from "react";
import styles from "./ZoomControl.module.css";

const ZoomControl = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Обработчик события приближения и отдаления колеса мыши
  const handleWheel = (event) => {
    // Определяем направление прокрутки колеса мыши
    const direction = event.deltaY > 0 ? "down" : "up";

    // Увеличиваем или уменьшаем уровень масштабирования в зависимости от направления
    if (direction === "down") {
      // Увеличиваем уровень масштабирования (приближение)
      setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel * 1.1, 0.1)); // Минимальный уровень масштабирования 0.1
    } else {
      // Уменьшаем уровень масштабирования (отдаление)
      setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel * 0.9, 0.1)); // Минимальный уровень масштабирования 0.1
    }
  };

  return (
    /*     <div
      onWheel={handleWheel}
      style={{ transform: `scale(${zoomLevel})` }}
      className={styles.comp}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit, minima dicta.
      </p>
    </div>
 */

    <div
      onWheel={handleWheel}
      style={{ transform: `scale(${zoomLevel})` }}
    >
      {children}
    </div>
  );
};

export default ZoomControl;
