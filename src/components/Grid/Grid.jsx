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

    return data.map((department) => {
      // Определение высоты строки для текущего департамента
      const departmentHeight = 100 / data.length;

      return department.tasks.map((task, index) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);

        // Находим координаты вертикальных линий, соответствующих датам начала и окончания задачи
        const startLine = dateRange.findIndex(
          (date) => date.getTime() === taskStartDate.getTime()
        );
        const endLine = dateRange.findIndex(
          (date) => date.getTime() === taskEndDate.getTime()
        );

        // Определяем координаты краев прямоугольника задачи относительно соответствующих вертикальных линий
        const left = (startLine * 100) / (dateRange.length - 1); // учитываем, что вертикальные линии должны быть равномерно распределены
        const width = ((endLine - startLine) * 100) / (dateRange.length - 1); // Добавляем 1 для включения последней даты

        // Определение top для каждой задачи в зависимости от индекса
        const top =
          ((department.id - 1) * 100) / data.length +
          (index * departmentHeight) / department.tasks.length;

        // Используем цвет задачи из данных
        const taskColor = task.color;

        return (
          <div
            key={task.id}
            className={styles.taskRectangle}
            style={{
              top: `${top}%`,
              height: `${departmentHeight / department.tasks.length}%`, // устанавливаем высоту для каждой задачи
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
