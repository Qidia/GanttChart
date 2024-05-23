import React from "react";
import styles from "./Grid.module.css";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import TaskRectangles from "../TaskRectangles/TaskRectangles";

/**
 * Компонент сетки, отображающий вертикальные линии, прямоугольники (задачи отделов) и горизонтальную линию.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.data - Данные о задачах.
 * @param {boolean} props.isLineVisible - Флаг видимости горизонтальной линии.
 * @param {boolean} props.showArrows - Флаг отображения стрелок между задачами и подзадачами.
 * @param {boolean} props.showSubtasks - Флаг отображения подзадач.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const Grid = ({ data, isLineVisible, showSubtasks }) => {
  /**
   * Функция для определения минимальной и максимальной даты среди всех задач и подзадач.
   * @returns {Object} - Объект с минимальной и максимальной датами.
   */
  const findMinMaxDates = () => {
    if (!data || data.length === 0) {
      return { minDate: null, maxDate: null };
    }

    let minDate = new Date(data[0].tasks[0].startDate);
    let maxDate = new Date(data[0].tasks[0].endDate);

    data.forEach((department) => {
      department.tasks.forEach((task) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);
        if (taskStartDate < minDate) {
          minDate = taskStartDate;
        }
        if (taskEndDate > maxDate) {
          maxDate = taskEndDate;
        }
        if (task.tasks && task.tasks.length > 0) {
          task.tasks.forEach((subtask) => {
            const subtaskStartDate = new Date(subtask.startDate);
            const subtaskEndDate = new Date(subtask.endDate);
            if (subtaskStartDate < minDate) {
              minDate = subtaskStartDate;
            }
            if (subtaskEndDate > maxDate) {
              maxDate = subtaskEndDate;
            }
            if (subtask.tasks && subtask.tasks.length > 0) {
              subtask.tasks.forEach((subsubtask) => {
                const subsubtaskStartDate = new Date(subsubtask.startDate);
                const subsubtaskEndDate = new Date(subsubtask.endDate);
                if (subsubtaskStartDate < minDate) {
                  minDate = subsubtaskStartDate;
                }
                if (subsubtaskEndDate > maxDate) {
                  maxDate = subsubtaskEndDate;
                }
              });
            }
          });
        }
      });
    });

    return { minDate, maxDate };
  };

  // Получение минимальной и максимальной даты среди всех задач и подзадач
  const { minDate, maxDate } = findMinMaxDates();

  // Максимальное количество вертикальных линий
  const maxVerticalLines = 30;

  /**
   * Функция для отрисовки вертикальных линий с датами.
   * @returns {JSX.Element[]|null} - Массив элементов JSX или null.
   */
  const renderVerticalLines = () => {
    if (!minDate || !maxDate) {
      return null;
    }

    // Вычисление общего количества дней и шага между вертикальными линиями
    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
    const step = totalDays / (maxVerticalLines - 1);

    // Создание массива с датами для вертикальных линий
    const dateArray = [];
    for (let i = 0; i < maxVerticalLines; i++) {
      const currentDate = new Date(maxDate);
      currentDate.setDate(maxDate.getDate() - Math.round(step * i));
      dateArray.push(currentDate);
    }

    // Рендеринг вертикальных линий с датами
    return dateArray.reverse().map((date, index) => (
      <div key={index} className={styles.verticalLines}>
        <div className={styles.verticalLine} />
        <div className={styles.date}>{date.toLocaleDateString()}</div>
      </div>
    ));
  };

  return (
    <>
      <div className={styles.grid}>
        {/* Отображение контейнера с вертикальными линиями */}
        <div className={styles.containerVerticalLine}>
          {renderVerticalLines()}
        </div>

        {/* Отображение контейнера с горизонтальной линией и задачами */}
        <div className={styles.containerHorizontalLine}>
          {isLineVisible && <HorizontalLine />}
          <TaskRectangles
            data={data}
            minDate={minDate}
            maxDate={maxDate}
            maxVerticalLines={maxVerticalLines}
            showSubtasks={showSubtasks}
          />
        </div>
      </div>
    </>
  );
};

export default Grid;
