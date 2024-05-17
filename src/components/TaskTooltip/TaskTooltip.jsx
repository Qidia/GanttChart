import React, { useEffect, useRef, useState } from "react";
import styles from "./TaskTooltip.module.css";

const TaskTooltip = ({ task, department, position }) => {
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState(position);

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const newPosition = { ...position };

      const padding = 10; // расстояние между всплывающим окном и краем окна браузера

      if (tooltipRect.right > window.innerWidth - padding) {
        newPosition.left = `${
          window.innerWidth - tooltipRect.width - padding - 50
        }px`;
      }

      if (tooltipRect.bottom > window.innerHeight - padding) {
        newPosition.top = `${
          window.innerHeight - tooltipRect.height - padding - 20
        }px`;
      }

      if (tooltipRect.left < padding) {
        newPosition.left = `${padding}px`;
      }

      if (tooltipRect.top < padding) {
        newPosition.top = `${padding}px`;
      }

      if (
        tooltipRect.bottom > window.innerHeight - padding &&
        tooltipRect.right > window.innerWidth - padding
      ) {
        newPosition.top = `${
          window.innerHeight - tooltipRect.height - padding - 50
        }px`;
        newPosition.left = `${window.innerWidth - tooltipRect.width * 2}px`;
      }

      setTooltipPosition(newPosition);
    }
  }, [position]);

  if (!task || !department || !position) return null;

  return (
    <div
      ref={tooltipRef}
      className={styles.tooltip}
      style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
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
