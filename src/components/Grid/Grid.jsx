import React, { useState } from "react";
import styles from "./Grid.module.css";
import HorizontalLine from "../HorizontalLine/HorizontalLine";

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

  const renderTaskRectangles = () => {
    if (!minDate || !maxDate) {
      return null;
    }

    const maxVerticalLines = 15;
    const totalDays = Math.ceil(
      (currentMaxDate - currentMinDate) / (1000 * 60 * 60 * 24)
    );
    const step = totalDays / (maxVerticalLines - 1);
    const verticalLines = Array.from({ length: maxVerticalLines }, (_, i) => {
      const date = new Date(currentMaxDate);
      date.setDate(currentMaxDate.getDate() - Math.round(step * i));
      return date;
    }).reverse();

    const findPosition = (date) => {
      const daysFromStart = Math.ceil(
        (date - currentMinDate) / (1000 * 60 * 60 * 24)
      );
      const lineIndex = verticalLines.findIndex((lineDate) => date <= lineDate);

      if (lineIndex === 0) return 0;
      if (lineIndex === -1) return 100;

      const prevLineDate = verticalLines[lineIndex - 1];
      const nextLineDate = verticalLines[lineIndex];

      const positionBetweenLines =
        ((date - prevLineDate) / (nextLineDate - prevLineDate)) * 100;
      const position =
        ((lineIndex - 1) / (maxVerticalLines - 1)) * 100 +
        positionBetweenLines / (maxVerticalLines - 1);

      return position;
    };

    return data.map((department, deptIndex) => {
      const departmentHeight = 100 / (data.length * 2);

      return department.tasks.map((task, index) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);

        if (taskStartDate < currentMinDate || taskEndDate > currentMaxDate) {
          return null;
        }

        const left = findPosition(taskStartDate);
        const right = findPosition(taskEndDate);
        const width = right - left;

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
