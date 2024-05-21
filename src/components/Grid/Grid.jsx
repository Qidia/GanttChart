import React, { useState, useCallback } from "react";
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
  const findMinMaxDates = useCallback(() => {
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
  }, [data]);

  const { minDate, maxDate } = findMinMaxDates(); // Получение минимальной и максимальной дат

  // Функция для генерации массива дат между начальной и конечной датой с определенным шагом
  const generateDateArray = (startDate, endDate, steps) => {
    const dates = [];
    const stepTime = (endDate - startDate) / (steps - 1);

    for (let i = 0; i < steps; i++) {
      dates.push(new Date(startDate.getTime() + stepTime * i));
    }
    return dates;
  };

  const maxVerticalLines = 30; // Максимальное количество вертикальных линий
  const [dateArray, setDateArray] = useState(() =>
    generateDateArray(minDate, maxDate, maxVerticalLines)
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Обработчик перемещения мыши
  const handleMouseMove = (e) => {
    const gridRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - gridRect.left;
    const lineWidth = gridRect.width / (dateArray.length - 1);

    let index = Math.floor(mouseX / lineWidth);
    if (index >= dateArray.length - 1) {
      index = dateArray.length - 2;
    }
    setHoveredIndex(index);
  };

  // Обработчик прокрутки колеса мыши
  const handleWheelScroll = (e) => {
    e.preventDefault();
    if (
      hoveredIndex === null ||
      hoveredIndex < 0 ||
      hoveredIndex >= dateArray.length - 1
    )
      return;

    const delta = Math.sign(e.deltaY);

    const newDateArray = [...dateArray];

    if (delta > 0) {
      // Прокрутка вниз
      if (
        hoveredIndex === 0 ||
        newDateArray[hoveredIndex].getTime() >
          newDateArray[hoveredIndex - 1].getTime()
      ) {
        newDateArray[hoveredIndex].setDate(
          newDateArray[hoveredIndex].getDate() - 1
        );
        newDateArray[hoveredIndex + 1].setDate(
          newDateArray[hoveredIndex + 1].getDate() + 1
        );
      }
    } else {
      // Прокрутка вверх
      const current = new Date(newDateArray[hoveredIndex]);
      const next = new Date(newDateArray[hoveredIndex + 1]);

      // Установим время на 00:00:00 для корректного сравнения дат
      current.setHours(0, 0, 0, 0);
      next.setHours(0, 0, 0, 0);

      const diffTime = next - current;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Если даты идут последовательно, не изменяем даты
        return;
      } else if (diffDays === 2) {
        // Если между датами одна дата, изменяем только левую дату
        current.setDate(current.getDate() + 1);
        newDateArray[hoveredIndex] = current;
      } else if (diffDays > 2) {
        // В других случаях изменяем обе даты
        current.setDate(current.getDate() + 1);
        next.setDate(next.getDate() - 1);
        newDateArray[hoveredIndex] = current;
        newDateArray[hoveredIndex + 1] = next;
      }
    }

    // Изменение дат для всех линий слева от левой линии прокрутки
    for (let i = hoveredIndex - 1; i >= 0; i--) {
      newDateArray[i] = new Date(dateArray[i + 1]);
    }

    // Изменение дат для всех линий справа от правой линии прокрутки
    for (let i = hoveredIndex + 2; i < newDateArray.length; i++) {
      newDateArray[i] = new Date(dateArray[i - 1]);
    }

    setDateArray(newDateArray);
  };

  // Функция для отрисовки вертикальных линий с датами
  const renderVerticalLines = () => {
    return dateArray.map((date, index) => (
      <div key={index} className={styles.flex}>
        <div className={styles.verticalLine} />
        <div className={styles.date}>{date.toLocaleDateString()}</div>
      </div>
    ));
  };

  return (
    <>
      <div
        className={styles.grid}
        onWheel={handleWheelScroll}
        onMouseMove={handleMouseMove}
      >
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
            currentMinDate={dateArray[0]}
            currentMaxDate={dateArray[dateArray.length - 1]}
            maxVerticalLines={maxVerticalLines}
          />
        </div>
      </div>
    </>
  );
};

export default Grid;
