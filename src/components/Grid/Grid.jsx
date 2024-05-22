import React from "react";
import styles from "./Grid.module.css";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import TaskRectangles from "../TaskRectangles/TaskRectangles";

/**
 * Компонент сетки, отображающий вертикальные линии, прямоугольники (задачи отделов) и горизонтальную линию.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.data - Данные о задачах.
 * @param {boolean} props.isLineVisible - Флаг видимости горизонтальной линии.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const Grid = ({ data, isLineVisible }) => {
  // Функция для определения минимальной и максимальной даты задач
  const findMinMaxDates = () => {
    if (!data || data.length === 0) {
      return { minDate: null, maxDate: null };
    }

    let minDate = new Date(data[0].tasks[0].startDate);
    let maxDate = new Date(data[0].tasks[0].endDate);

    // Перебор данных для нахождения минимальной и максимальной даты
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
      });
    });

    return { minDate, maxDate };
  };

  const { minDate, maxDate } = findMinMaxDates(); // Получение минимальной и максимальной дат

  const maxVerticalLines = 30; // Максимальное количество вертикальных линий

  // Функция для отрисовки вертикальных линий с датами
  const renderVerticalLines = () => {
    if (!minDate || !maxDate) {
      return null;
    }

    const totalDays = Math.ceil(
      (maxDate - minDate) / (1000 * 60 * 60 * 24)
    );
    const step = totalDays / (maxVerticalLines - 1); // Шаг между датами

    const dateArray = [];
    for (let i = 0; i < maxVerticalLines; i++) {
      const currentDate = new Date(maxDate);
      currentDate.setDate(maxDate.getDate() - Math.round(step * i));
      dateArray.push(currentDate);
    }

    // Отрисовка вертикальных линий и дат
    return dateArray.reverse().map((date, index) => (
      <div key={index} className={styles.flex}>
        <div className={styles.verticalLine} />
        <div className={styles.date}>{date.toLocaleDateString()}</div>
      </div>
    ));
  };

  return (
    <>
      <div className={styles.grid}>
        {/* Отображение вертикальных линий и дат */}
        <div className={styles.containerVerticalLine}>
          {renderVerticalLines()}
        </div>

        {/* Отображение горизонтальной линии и прямоугольников задач */}
        <div className={styles.containerHorizontalLine}>
          {isLineVisible && <HorizontalLine />}
          <TaskRectangles
            data={data}
            minDate={minDate}
            maxDate={maxDate}
            maxVerticalLines={maxVerticalLines}
          />
        </div>
      </div>
    </>
  );
};

export default Grid;
