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
    const totalDays = Math.ceil(
      (maxDate - minDate) / (1000 * 60 * 60 * 24) + 1
    );

    // Создаем массив дат между минимальной и максимальной датами
    const dateArray = Array.from({ length: totalDays }, (_, index) => {
      const currentDate = new Date(minDate);
      currentDate.setDate(currentDate.getDate() + index);
      return currentDate;
    });

    return dateArray.map((date, index) => (
      <div key={index} className={styles.flex}>
        <div className={styles.verticalLine} />
        <div className={styles.date}>{date.toLocaleDateString()}</div>
      </div>
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

  // Функция для рендеринга прямоугольников задач
const renderTaskRectangles = () => {
  if (!minDate || !maxDate) {
    return null;
  }

  const dateRange = [];
  let currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data.map((department, deptIndex) => {
    // Определение высоты строки для текущего департамента с учетом зазора
    const departmentHeight = 100 / (data.length * 2); 

    return department.tasks.map((task, index) => {
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);

      const startLine = dateRange.findIndex(
        (date) => date.getTime() === taskStartDate.getTime()
      );
      const endLine = dateRange.findIndex(
        (date) => date.getTime() === taskEndDate.getTime()
      );

      const left = (startLine * 100) / (dateRange.length - 1);
      const width = ((endLine - startLine) * 100) / (dateRange.length - 1);

      // Рассчитываем вертикальную позицию с учетом зазора между департаментами
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
      <div className={styles.grid}>
        <div className={styles.containerVerticalLine}>
          {/* Рендер вертикальных линий и дат */}
          {renderVerticalLines()}
        </div>

        <div className={styles.containerHorizontalLine}>
          
{/*           <div className={styles.horizontalLine}></div>
 */}

 {/*           {renderHorizontalLines()}
 */}
          {renderTaskRectangles()}
        </div>
      </div>
    </>
  );
};

export default Grid;
