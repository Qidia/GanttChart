import React, { useEffect, useState } from "react";
import styles from "./Grid.module.css";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import TaskRectangles from "../TaskRectangles/TaskRectangles";

/**
 * Компонент сетки, отображающий вертикальные линии, прямоугольники (задачи отделов) и горизонтальную линию.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.data - Данные о задачах.
 * @param {boolean} props.isLineVisible - Флаг видимости горизонтальной линии.
 * @param {boolean} props.showSubtasks - Флаг отображения подзадач.
 * @param {Object} props.departmentColors - Цвета отделов.
 * @param {string} props.selectedOption - Выбранная опция отображения цветов.
 * @param {Object} props.dateRange - Выбранный диапазон дат.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const Grid = ({
  data,
  isLineVisible,
  showSubtasks,
  departmentColors,
  selectedOption,
  dateRange,
  outlineColor
}) => {
  /**
   * Функция для определения минимальной и максимальной даты среди всех задач и подзадач.
   * @returns {Object} - Объект с минимальной и максимальной датами.
   */
  const findMinMaxDates = () => {
    if (!data || data.length === 0) {
      return { minDate: null, maxDate: null };
    }

    // Инициализация минимальной и максимальной даты первой задачей
    let minDate = new Date(data[0].tasks[0].startDate);
    let maxDate = new Date(data[0].tasks[0].endDate);

    // Проход по всем задачам и подзадачам для определения их минимальных и максимальных дат
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

  const maxVerticalLines = 30; // Максимальное количество веркальтиных линий
  // Если dateRange был передан и содержит корректные startDate и endDate, используем их
  let minDate, maxDate;
  if (
    dateRange &&
    dateRange.startDate &&
    dateRange.endDate &&
    new Date(dateRange.startDate) < new Date(dateRange.endDate)
  ) {
    minDate = new Date(dateRange.startDate);
    maxDate = new Date(dateRange.endDate);
  } else {
    // В противном случае рассчитываем minDate и maxDate на основе данных задач
    const dates = findMinMaxDates();
    minDate = dates.minDate;
    maxDate = dates.maxDate;
  }

  // Проверка наличия минимальной и максимальной даты, если отсутствуют, возвращаем null
  if (!minDate || !maxDate) {
    return null;
  }

  // Вычисление общего количества дней и шага между вертикальными линиями
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));


  const verticalLineCount = Math.min(totalDays + 1, maxVerticalLines);

  
  const step = totalDays / (verticalLineCount - 1);

  /**
   * Функция для отрисовки вертикальных линий с датами.
   * @returns {JSX.Element[]|null} - Массив элементов JSX или null.
   */
  const renderVerticalLines = () => {
    // Создание массива с датами для вертикальных линий
    const dateArray = [];
    for (let i = 0; i < verticalLineCount; i++) {
      const currentDate = new Date(minDate);
      currentDate.setDate(minDate.getDate() + Math.round(step * i));
      dateArray.push(currentDate);
    }

    // Рендеринг вертикальных линий с датами
    return dateArray.map((date, index) => (
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
            maxVerticalLines={verticalLineCount}
            showSubtasks={showSubtasks}
            departmentColors={departmentColors}
            selectedOption={selectedOption}
            step={step}
            outlineColor={outlineColor}
          />
        </div>
      </div>
    </>
  );
};

export default Grid;
