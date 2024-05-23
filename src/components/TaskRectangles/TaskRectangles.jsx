import React, { useState } from "react";
import styles from "./TaskRectangles.module.css";
import TaskTooltip from "../TaskTooltip/TaskTooltip";
import DepartmentsModal from "../DepartmentsModal/DepartmentsModal";

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
  showSubtasks,
}) => {
  // Состояние для отображения тултипа (подсказки)
  const [tooltip, setTooltip] = useState({
    task: null,
    department: null,
    position: null,
  });

  // Состояние для выбранного департамента и состояния модального окна
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Обработчик клика по департаменту
  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  // Обработчик закрытия модального окна
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  // Функция для нахождения позиции задачи по дате
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

  // Проверка наличия минимальной и максимальной даты
  if (!minDate || !maxDate) {
    return null;
  }

  // Вычисление общего количества дней и шага между вертикальными линиями
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
  const step = totalDays / (maxVerticalLines - 1);

  // Создание массива с датами вертикальных линий
  const verticalLines = Array.from({ length: maxVerticalLines }, (_, i) => {
    const date = new Date(maxDate);
    date.setDate(maxDate.getDate() - Math.round(step * i));
    return date;
  }).reverse();

  // Функция для рендеринга задачи
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

    // Проверка на вхождение задачи в диапазон отображаемых дат
    if (taskStartDate < minDate || taskEndDate > maxDate) {
      return null;
    }

    // Вычисление позиции и размеров задачи
    const left = findPosition(taskStartDate);
    const right = findPosition(taskEndDate);
    const width = right - left;

    // Вычисление вертикальной позиции и высоты задачи
    const top =
      ((deptIndex * 2 + 0.3) * 100) / (data.length * 2) +
      (index * departmentHeight) / (department.tasks.length || 1);
    const taskColor = task.color;

    return (
      <div
        key={`${task.id}-${index}`}
        className={`${showSubtasks ? styles.showSubtasks_Subtasks : ""}`}
      >
        <div
          className={` ${!showSubtasks ? styles.taskRectangle : ""}`}
          style={{
            top: ` ${showSubtasks ? 0 : top}%`,
            height: `${
              showSubtasks
                ? 100
                : departmentHeight / (department.tasks.length || 1)
            }%`,
            left: `${left}%`,
            width: `${width}%`,
            backgroundColor: taskColor,
            position: "absolute",
          }}
          onMouseEnter={(e) => handleMouseEnter(e, task, department)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleDepartmentClick(department)}
        />
        {/* Рекурсивный вызов для рендеринга подзадач */}
        {showSubtasks && task.tasks && (
          <div className={styles.showSubtasks_Task}>
            {task.tasks.map((subtask, subIndex) =>
              renderTask(
                subtask,
                deptIndex,
                subIndex,
                departmentHeight,
                department,
                depth + 1
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${styles.containerHorizontalLine} ${
        showSubtasks ? styles.showSubtasks_Task : ""
      }`}
    >
      {/* Рендеринг задач для каждого отдела */}
      {data.map((department, deptIndex) => {
        const departmentHeight = 100 / (data.length * 2);

        return department.tasks.map((task, index) =>
          renderTask(task, deptIndex, index, departmentHeight, department)
        );
      })}

      {/* Всплывающая подсказка для задач */}
      {tooltip.task && (
        <TaskTooltip
          task={tooltip.task}
          department={tooltip.department}
          position={tooltip.position}
        />
      )}

      {!showSubtasks && selectedDepartment && (
        <DepartmentsModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          department={selectedDepartment}
        />
      )}
    </div>
  );
};

export default TaskRectangles;
