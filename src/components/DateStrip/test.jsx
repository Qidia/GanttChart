// DateStrip.js
import React from "react";

const DateStrip = ({ tasks }) => {
  const findMinMaxDates = () => {
    if (!tasks || tasks.length === 0) {
      return { minDate: null, maxDate: null };
    }

    let minDate = new Date(tasks[0].tasks[0].startDate);
    let maxDate = new Date(tasks[0].tasks[0].endDate);

    tasks.forEach((department) => {
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

  const renderDateStrip = () => {
    if (!minDate || !maxDate) {
      return null;
    }

    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));

    const dateArray = Array.from({ length: totalDays }, (_, index) => {
      const currentDate = new Date(minDate); // Начинаем с самой ранней даты
      currentDate.setDate(currentDate.getDate() + index); // Увеличиваем дату на каждой итерации
      return currentDate.toLocaleDateString();
    }); // Обратный порядок

    return (
      <div className="date-strip">
        {dateArray.map((date, index) => (
          <div key={index} className="date">
            {date}
          </div>
        ))}
      </div>
    );
  };

  return <div className="date-strip-container">{renderDateStrip()}</div>;
};

export default DateStrip;
