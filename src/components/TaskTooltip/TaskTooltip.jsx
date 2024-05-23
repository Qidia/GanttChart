import React, { useEffect, useRef, useState } from "react";
import styles from "./TaskTooltip.module.css";

/**
 * Компонент для отображения подсказки о задаче.
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.task - Данные о задаче.
 * @param {Object} props.department - Данные о подразделении.
 * @param {Object} props.position - Позиция подсказки.
 * @param {number} props.horizontalLineHeight - Высота горизонтальной линии.
 * @returns {JSX.Element|null} - Элемент JSX компонента или null.
 */
const TaskTooltip = ({ task, department, position, horizontalLineHeight }) => {
  // Ссылка на элемент подсказки
  const tooltipRef = useRef(null);
  // Состояние для позиции подсказки
  const [tooltipPosition, setTooltipPosition] = useState({
    visibility: "hidden",
  });

  // Эффект для определения позиции подсказки
  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const padding = 35; // Расстояние между всплывающим окном и краем окна браузера

      // Начальная позиция подсказки
      let newPosition = { top: position.top + 10, left: position.left + 10 };

      // Учитываем высоту горизонтальной линии
      const offsetY =
        newPosition.top > horizontalLineHeight ? horizontalLineHeight : 0;

      // Проверка, выходит ли подсказка за правый край окна
      if (newPosition.left + tooltipRect.width > window.innerWidth - padding) {
        newPosition.left = position.left - tooltipRect.width - 10;
      }

      // Проверка, выходит ли подсказка за нижний край окна
      if (
        newPosition.top + tooltipRect.height + offsetY >
        window.innerHeight - padding
      ) {
        newPosition.top = position.top - tooltipRect.height - offsetY - 10;
      }

      // Проверка, выходит ли подсказка за левый край окна
      if (newPosition.left < padding) {
        newPosition.left = position.left + 10;
      }

      // Проверка, выходит ли подсказка за верхний край окна
      if (newPosition.top < padding) {
        newPosition.top = position.top + 10;
      }

      // Установка позиции подсказки
      setTooltipPosition({ ...newPosition, visibility: "visible" });
    }
  }, [position, horizontalLineHeight]);

  // Если нет данных о задаче или подразделении, возвращается null
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
      {/* Отображение данных о задаче */}
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
        <strong>Статус:</strong> {task.status}
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
