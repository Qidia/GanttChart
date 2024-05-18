import React, { useState } from "react";
import styles from "./TaskRectangles.module.css";
import TaskTooltip from "../TaskTooltip/TaskTooltip";

/**
 * Компонент отображения прямоугольников задач.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.data - Данные о задачах.
 * @param {Date} props.minDate - Минимальная дата.
 * @param {Date} props.maxDate - Максимальная дата.
 * @param {Date} props.currentMinDate - Текущая минимальная дата.
 * @param {Date} props.currentMaxDate - Текущая максимальная дата.
 * @param {Date} props.maxVerticalLines - Максимальное количество отображаемых веркальтиных линий.
 * @returns {JSX.Element|null} - Элемент JSX компонента или null.
 */
const TaskRectangles = ({
  data,
  minDate,
  maxDate,
  currentMinDate,
  currentMaxDate,
  maxVerticalLines,
}) => {
  // Состояние для отображения подсказки по задаче
  const [tooltip, setTooltip] = useState({
    task: null,
    department: null,
    position: null,
  });

  // Обработчик события наведения мыши на прямоугольник задачи
  const handleMouseEnter = (e, task, department) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Установка состояния для отображения подсказки с позицией мыши
    setTooltip({ task, department, position: { top: mouseY, left: mouseX } });
  };

  // Обработчик события ухода мыши с прямоугольника задачи
  const handleMouseLeave = () => {
    // Скрытие подсказки
    setTooltip({ task: null, department: null, position: null });
  };

  // Функция для определения позиции прямоугольника задачи на горизонтальной оси
  const findPosition = (date) => {
    // Вычисление индекса вертикальной линии, к которой привязана задача
    const lineIndex = verticalLines.findIndex((lineDate) => date <= lineDate);

    // Если задача находится до первой линии, возвращается 0
    if (lineIndex === 0) return 0;
    // Если задача находится после последней линии, возвращается 100
    if (lineIndex === -1) return 100;

    // Получение даты предыдущей и следующей вертикальных линий
    const prevLineDate = verticalLines[lineIndex - 1];
    const nextLineDate = verticalLines[lineIndex];

    // Вычисление позиции между вертикальными линиями
    const positionBetweenLines =
      ((date - prevLineDate) / (nextLineDate - prevLineDate)) * 100;
    // Вычисление общей позиции задачи на горизонтальной оси
    const position =
      ((lineIndex - 1) / (maxVerticalLines - 1)) * 100 +
      positionBetweenLines / (maxVerticalLines - 1);

    return position;
  };

  // Проверка наличия данных о датах
  if (!minDate || !maxDate) {
    return null;
  }

  // Вычисление параметров вертикальных линий для разметки временной шкалы
  const totalDays = Math.ceil(
    (currentMaxDate - currentMinDate) / (1000 * 60 * 60 * 24)
  );
  const step = totalDays / (maxVerticalLines - 1);
  const verticalLines = Array.from({ length: maxVerticalLines }, (_, i) => {
    const date = new Date(currentMaxDate);
    date.setDate(currentMaxDate.getDate() - Math.round(step * i));
    return date;
  }).reverse();

  return (
    <div className={styles.containerHorizontalLine}>
      {/* Маппинг данных о задачах */}
      {data.map((department, deptIndex) => {
        // Вычисление высоты блока подразделения
        const departmentHeight = 100 / (data.length * 2);

        return department.tasks.map((task, index) => {
          // Получение дат начала и окончания задачи
          const taskStartDate = new Date(task.startDate);
          const taskEndDate = new Date(task.endDate);

          // Проверка, входит ли задача в текущий временной диапазон
          if (taskStartDate < currentMinDate || taskEndDate > currentMaxDate) {
            return null;
          }

          // Вычисление позиции и ширины прямоугольника задачи
          const left = findPosition(taskStartDate);
          const right = findPosition(taskEndDate);
          const width = right - left;

          // Вычисление вертикальной позиции прямоугольника задачи
          const top =
            ((deptIndex * 2 + 0.3) * 100) / (data.length * 2) +
            (index * departmentHeight) / department.tasks.length;

          // Получение цвета задачи
          const taskColor = task.color;

          return (
            <div
              key={task.id}
              className={styles.taskRectangle}
              style={{
                top: `${top}%`,
                height: `${departmentHeight / department.tasks.length}%`,
                left: `${left}%`,
                width: `${width}%`,
                backgroundColor: taskColor,
              }}
              onMouseEnter={(e) => handleMouseEnter(e, task, department)}
              onMouseLeave={handleMouseLeave}
            />
          );
        });
      })}

      {/* Отображение подсказки о задаче */}
      {tooltip.task && (
        <TaskTooltip
          task={tooltip.task}
          department={tooltip.department}
          position={tooltip.position}
        />
      )}
    </div>
  );
};

export default TaskRectangles;
