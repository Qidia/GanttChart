import React from "react";
import styles from "./Grid.module.css";

const Grid = ({ data }) => {
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

  // Функция для рендеринга вертикальных линий
  const renderVerticalLines = () => {
    if (!minDate || !maxDate) {
      return null;
    }

    // Количество дней между самой ранней и самой поздней датами
    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));

    return Array.from({ length: totalDays }, (_, index) => (
      <div key={index} className={styles.verticalLine} />
    ));
  };

  // Функция для рендеринга горизонтальных линий
  const renderHorizontalLines = () => {
    if (!data || data.length === 0) {
      return null;
    }

    return data.map((department) => (
      <div key={department.id} className={styles.horizontalLine} />
    ));
  };

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.containerVerticalLine}>
          {renderVerticalLines()}
        </div>

        <div className={styles.containerHorizontalLine}>
          <div className={styles.horizontalLine}></div>
          {renderHorizontalLines()}
        </div>
      </div>
    </>
  );
};

export default Grid;
