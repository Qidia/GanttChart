import React, { useState } from "react";
import styles from "./TaskRectangles.module.css";
import TaskTooltip from "../TaskTooltip/TaskTooltip";

/**
 * Компонент отображения прямоугольников задач.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.data - Данные о задачах.
 * @param {Date} props.minDate - Минимальная дата.
 * @param {Date} props.maxDate - Максимальная дата.
 * @param {number} props.maxVerticalLines - Максимальное количество отображаемых вертикальных линий.
 * @param {boolean} props.showArrows - Флаг отображения стрелок между задачами и подзадачами.
 * @param {boolean} props.showSubtasks - Флаг отображения подзадач.
 * @returns {JSX.Element|null} - Элемент JSX компонента или null.
 */
const TaskRectangles = ({
  data,
  minDate,
  maxDate,
  maxVerticalLines,
  showArrows,
  showSubtasks,
}) => {
  // Состояние для отображения всплывающей подсказки
  const [tooltip, setTooltip] = useState({
    task: null,
    department: null,
    position: null,
  });

  // Обработчик события наведения мыши на задачу
  const handleMouseEnter = (e, task, department) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setTooltip({ task, department, position: { top: mouseY, left: mouseX } });
  };

  // Обработчик события ухода мыши с задачи
  const handleMouseLeave = () => {
    setTooltip({ task: null, department: null, position: null });
  };

  // Функция для определения позиции задачи на шкале времени
  const findPosition = (date) => {
    const lineIndex = verticalLines.findIndex((lineDate) => date <= lineDate);
    if (lineIndex === 0) return 0;
    if (lineIndex === -1) return 100;

    const prevLineDate = verticalLines[lineIndex - 1];
    const nextLineDate = verticalLines[lineIndex];

    const positionBetweenLines =
      ((date - prevLineDate) / (nextLineDate - prevLineDate)) * 100;
    const position =
      ((lineIndex - 1) / (maxVerticalLines - 1)) * 100 +
      positionBetweenLines / (maxVerticalLines - 1);

    return position;
  };

  // Если минимальная или максимальная дата не заданы, ничего не рендерим
  if (!minDate || !maxDate) {
    return null;
  }

  // Вычисление количества дней между minDate и maxDate
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
  // Шаг между вертикальными линиями
  const step = totalDays / (maxVerticalLines - 1);
  // Создание массива с датами вертикальных линий
  const verticalLines = Array.from({ length: maxVerticalLines }, (_, i) => {
    const date = new Date(maxDate);
    date.setDate(maxDate.getDate() - Math.round(step * i));
    return date;
  }).reverse();

  // Функция рендеринга одной задачи
  const renderTask = (
    task,
    deptIndex,
    index,
    departmentHeight,
    department,
    depth = 0
  ) => {
    const taskStartDate = new Date(task.startDate);
    const taskEndDate = new Date(task.endDate);

    // Если задача вне диапазона дат, не рендерим её
    if (taskStartDate < minDate || taskEndDate > maxDate) {
      return null;
    }

    const left = findPosition(taskStartDate);
    const right = findPosition(taskEndDate);
    const width = right - left;

    // Определение позиции задачи по вертикали
    const top =
      ((deptIndex * 2 + 0.3) * 100) / (data.length * 2) +
      (index * departmentHeight) / (department.tasks.length || 1);
    const taskColor = task.color;

    return (
      <div key={`${task.id}-${index}`}>
        <div
          className={styles.taskRectangle}
          style={{
            top: `${top}%`,
            height: `${departmentHeight / (department.tasks.length || 1)}%`,
            left: `${left}%`,
            width: `${width}%`,
            backgroundColor: taskColor,
            position: "absolute",
          }}
          onMouseEnter={(e) => handleMouseEnter(e, task, department)}
          onMouseLeave={handleMouseLeave}
        />
        {showSubtasks && task.subtasks && (
          <div>
            {task.subtasks.map((subtask, subIndex) =>
              renderSubtask(
                subtask,
                top,
                left,
                width,
                subIndex,
                task.subtasks.length,
                showArrows,
                deptIndex,
                index,
                subIndex
              )
            )}
          </div>
        )}
      </div>
    );
  };

  // Функция рендеринга подзадач
  const renderSubtask = (
    subtask,
    parentTop,
    parentLeft,
    parentWidth,
    subIndex,
    totalSubtasks,
    showArrows,
    deptIndex,
    taskIndex,
    subtaskIndex
  ) => {
    const subtaskStartDate = new Date(subtask.startDate);
    const subtaskEndDate = new Date(subtask.endDate);

    // Если подзадача вне диапазона дат, не рендерим её
    if (subtaskStartDate < minDate || subtaskEndDate > maxDate) {
      return null;
    }

    const left = findPosition(subtaskStartDate);
    const right = findPosition(subtaskEndDate);
    const width = right - left;
    const top = parentTop + 5 * (subIndex + 1); // Сдвиг подзадач по вертикали
    const subtaskColor = subtask.color;

    return (
      <div key={`${subtask.id}-${subIndex}`}>
        <div
          className={styles.taskRectangle}
          style={{
            top: `${top}%`,
            height: "3%",
            left: `${left}%`,
            width: `${width}%`,
            backgroundColor: subtaskColor,
            position: "absolute",
          }}
          onMouseEnter={(e) => handleMouseEnter(e, subtask, null)}
          onMouseLeave={handleMouseLeave}
        />
{/*         {showArrows && subIndex < totalSubtasks - 1 && (
          <svg
            className={styles.arrow}
            style={{ top: `${top + 1.5}%`, left: `${right}%` }}
            viewBox="0 0 100 100"
          >
            <path d="M 0 50 Q 50 0, 100 50" stroke="black" fill="transparent" />
            <polygon points="100,45 100,55 110,50" fill="black" />
          </svg>
        )}
 */}        {subtask.subtasks && (
          <div>
            {subtask.subtasks.map((subSubtask, subSubIndex) =>
              renderSubtask(
                subSubtask,
                top,
                left,
                width,
                subSubIndex,
                subtask.subtasks.length,
                showArrows,
                deptIndex,
                taskIndex,
                subIndex + subSubIndex + 1
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.containerHorizontalLine}>
      {data.map((department, deptIndex) => {
        const departmentHeight = 100 / (data.length * 2);

        return department.tasks.map((task, index) =>
          renderTask(task, deptIndex, index, departmentHeight, department)
        );
      })}

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
