import React, { useState } from "react";
import styles from "./Grid.module.css";
import HorizontalLine from "../HorizontalLine/HorizontalLine";

const Grid = ({ data, isLineVisible }) => {
  // Функция для нахождения самой ранней и самой поздней даты
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
      });
    });

    return { minDate, maxDate };
  };

  const { minDate, maxDate } = findMinMaxDates();
  const [currentMinDate, setCurrentMinDate] = useState(minDate);
  const [currentMaxDate, setCurrentMaxDate] = useState(maxDate);

  // Функция для обработки события прокрутки колесика мыши
  const handleWheelScroll = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY); // Определяем направление прокрутки

    const newMinDate = new Date(currentMinDate);
    const newMaxDate = new Date(currentMaxDate);
    const daysDifference = Math.ceil(
      (newMaxDate - newMinDate) / (1000 * 60 * 60 * 24)
    );

    // Обновляем текущий интервал дат в зависимости от направления прокрутки
    if (delta > 0) {
      // Zooming in
      newMinDate.setDate(newMinDate.getDate() + 1);
      newMaxDate.setDate(newMaxDate.getDate() - 1);
    } else if (daysDifference > 1) {
      // Zooming out
      newMinDate.setDate(newMinDate.getDate() - 1);
      newMaxDate.setDate(newMaxDate.getDate() + 1);
    }

    setCurrentMinDate(newMinDate);
    setCurrentMaxDate(newMaxDate);
  };

  // Функция для рендеринга вертикальных линий
  const renderVerticalLines = () => {
    if (!currentMinDate || !currentMaxDate) {
      return null;
    }

    // Максимальное количество вертикальных линий
    const maxVerticalLines = 15;

    // Количество дней между текущей самой ранней и самой поздней датами
    const totalDays = Math.ceil(
      (currentMaxDate - currentMinDate) / (1000 * 60 * 60 * 24)
    );

    // Шаг между вертикальными линиями
    const step = totalDays / (maxVerticalLines - 1);

    // Массив дат с равным интервалом между ними на основе шага
    const dateArray = [];
    for (let i = 0; i < maxVerticalLines; i++) {
      const currentDate = new Date(currentMaxDate);
      currentDate.setDate(currentMaxDate.getDate() - Math.round(step * i));
      dateArray.push(currentDate);
    }

    return dateArray.reverse().map((date, index) => (
      <div key={index} className={styles.flex}>
        <div className={styles.verticalLine} />
        <div className={styles.date}>{date.toLocaleDateString()}</div>
      </div>
    ));
  };

  const renderTaskRectangles = () => {
    if (!minDate || !maxDate) {
      return null;
    }

    return data.map((department, deptIndex) => {
      const departmentHeight = 100 / (data.length * 2);

      return department.tasks.map((task, index) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);

        if (taskStartDate < currentMinDate || taskEndDate > currentMaxDate) {
          return null;
        }

        const totalDays = Math.ceil(
          (currentMaxDate - currentMinDate) / (1000 * 60 * 60 * 24)
        );
        const daysFromStart = Math.ceil(
          (taskStartDate - currentMinDate) / (1000 * 60 * 60 * 24)
        );
        const daysFromEnd = Math.ceil(
          (currentMaxDate - taskEndDate) / (1000 * 60 * 60 * 24)
        );

        const left = (daysFromStart / totalDays) * 100;
        const width =
          ((totalDays - daysFromStart - daysFromEnd) / totalDays) * 100;

        const top =
          ((deptIndex * 2 + 0.3) * 100) / (data.length * 2) +
          (index * departmentHeight) / department.tasks.length;

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
          />
        );
      });
    });
  };

  return (
    <>
      <div className={styles.grid} onWheelCapture={handleWheelScroll}>
        <div className={styles.containerVerticalLine}>
          {renderVerticalLines()}
        </div>

        <div className={styles.containerHorizontalLine}>
          {renderTaskRectangles()}
          {isLineVisible && <HorizontalLine />}
        </div>
      </div>
    </>
  );
};

export default Grid;
