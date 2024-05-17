import React, { useState } from "react";
import styles from "./Grid.module.css";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import TaskRectangles from "../TaskRectangles/TaskRectangles";

const Grid = ({ data, isLineVisible }) => {
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

  const renderVerticalLines = () => {
    if (!currentMinDate || !currentMaxDate) {
      return null;
    }

    const maxVerticalLines = 15;
    const totalDays = Math.ceil(
      (currentMaxDate - currentMinDate) / (1000 * 60 * 60 * 24)
    );
    const step = totalDays / (maxVerticalLines - 1);

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

  return (
    <>
      <div className={styles.grid} onWheelCapture={handleWheelScroll}>
        <div className={styles.containerVerticalLine}>
          {renderVerticalLines()}
        </div>

        <div className={styles.containerHorizontalLine}>
          {isLineVisible && <HorizontalLine />}
          <TaskRectangles
            data={data}
            minDate={minDate}
            maxDate={maxDate}
            currentMinDate={currentMinDate}
            currentMaxDate={currentMaxDate}
          />
        </div>
      </div>
    </>
  );
};

export default Grid;
