import React, { useState } from "react";
import TaskTooltip from "../TaskTooltip/TaskTooltip";
import styles from "./TaskRectangles.module.css";

const TaskRectangles = ({
  data,
  minDate,
  maxDate,
  currentMinDate,
  currentMaxDate,
}) => {
  const [tooltip, setTooltip] = useState({
    task: null,
    department: null,
    position: null,
  });

  const handleMouseEnter = (e, task, department) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setTooltip({ task, department, position: { top: mouseY, left: mouseX } });
  };

  const handleMouseLeave = () => {
    setTooltip({ task: null, department: null, position: null });
  };

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

  return (
    <div className={styles.containerHorizontalLine}>
      {data.map((department, deptIndex) => {
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
              onMouseEnter={(e) => handleMouseEnter(e, task, department)}
              onMouseLeave={handleMouseLeave}
            />
          );
        });
      })}
      {tooltip.task && (
        <TaskTooltip
          task={tooltip.task}
          department={tooltip.department}
          position={tooltip.position}
        />
      )}
    </div>
  );
};

export default TaskRectangles;
