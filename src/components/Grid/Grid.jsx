import React, { useState } from "react";
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

  // Состояния для текущей минимальной и максимальной даты
  const [currentMinDate, setCurrentMinDate] = useState(minDate);
  const [currentMaxDate, setCurrentMaxDate] = useState(maxDate);

  // Обработчик прокрутки колеса мыши
  const handleWheelScroll = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);

    const newMinDate = new Date(currentMinDate);
    const newMaxDate = new Date(currentMaxDate);

    const daysDifference = Math.ceil(
      (newMaxDate - newMinDate) / (1000 * 60 * 60 * 24)
    );

    if (delta > 0) {
      newMinDate.setDate(newMinDate.getDate() + 1);
      newMaxDate.setDate(newMaxDate.getDate() - 1);
    } else if (daysDifference > 1) {
      newMinDate.setDate(newMinDate.getDate() - 1);
      newMaxDate.setDate(newMaxDate.getDate() + 1);
    }

    setCurrentMinDate(newMinDate);
    setCurrentMaxDate(newMaxDate);
  };

  const maxVerticalLines = 30; // Максимальное количество веркальтиных линий

  // Функция для отрисовки вертикальных линий с датами
  const renderVerticalLines = () => {
    if (!currentMinDate || !currentMaxDate) {
      return null;
    }

    const totalDays = Math.ceil(
      (currentMaxDate - currentMinDate) / (1000 * 60 * 60 * 24)
    );
    const step = totalDays / (maxVerticalLines - 1); // Шаг между датами

    const dateArray = [];
    for (let i = 0; i < maxVerticalLines; i++) {
      const currentDate = new Date(currentMaxDate);
      currentDate.setDate(currentMaxDate.getDate() - Math.round(step * i));
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
      <div className={styles.grid} onWheelCapture={handleWheelScroll}>
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
            currentMinDate={currentMinDate}
            currentMaxDate={currentMaxDate}
            maxVerticalLines={maxVerticalLines}
          />
        </div>
      </div>
    </>
  );
};

export default Grid;
