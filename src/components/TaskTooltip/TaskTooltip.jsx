import React, { useEffect, useRef, useState } from "react";
import styles from "./TaskTooltip.module.css";

const TaskTooltip = ({ task, department, position, horizontalLineHeight }) => {
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    visibility: "hidden",
  });

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const padding = 35; // расстояние между всплывающим окном и краем окна браузера

      let newPosition = { top: position.top + 10, left: position.left + 10 };

      // Учитываем высоту горизонтальной линии
      const offsetY =
        newPosition.top > horizontalLineHeight ? horizontalLineHeight : 0;

      // Проверка, выходит ли tooltip за правый край окна
      if (newPosition.left + tooltipRect.width > window.innerWidth - padding) {
        newPosition.left = position.left - tooltipRect.width - 10;
      }

      // Проверка, выходит ли tooltip за нижний край окна
      if (
        newPosition.top + tooltipRect.height + offsetY >
        window.innerHeight - padding
      ) {
        newPosition.top = position.top - tooltipRect.height - offsetY - 10;
      }

      // Проверка, выходит ли tooltip за левый край окна
      if (newPosition.left < padding) {
        newPosition.left = position.left + 10;
      }

      // Проверка, выходит ли tooltip за верхний край окна
      if (newPosition.top < padding) {
        newPosition.top = position.top + 10;
      }

      setTooltipPosition({ ...newPosition, visibility: "visible" });
    }
  }, [position, horizontalLineHeight]);

  if (!task || !department) return null;

  return (
    <div
      ref={tooltipRef}
      className={styles.tooltip}
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        visibility: tooltipPosition.visibility,
      }}
    >
      <div>
        <strong>Отдел:</strong> {department.name}
      </div>
      <div>
        <strong>ID задачи:</strong> {task.id}
      </div>
      <div>
        <strong>Название:</strong> {task.title}
      </div>
      <div>
        <strong>Исполнитель:</strong> {task.assignee}
      </div>
      <div>
        <strong>Начало:</strong> {new Date(task.startDate).toLocaleDateString()}
      </div>
      <div>
        <strong>Конец:</strong> {new Date(task.endDate).toLocaleDateString()}
      </div>
      <div>
        <strong>Цвет:</strong>{" "}
        <span
          style={{ backgroundColor: task.color }}
          className={styles.colorBox}
        ></span>
      </div>
    </div>
  );
};

export default TaskTooltip;
