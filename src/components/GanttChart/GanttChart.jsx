import React, { useState } from "react";
import GanttChartManagement from "../GanttChartManagement/GanttChartManagement";
import styles from "./GanttChart.module.css";

const GanttChart = () => {
  const [isNamesVisible, setIsNamesVisible] = useState(false);

  return (
    <>
      <GanttChartManagement
        className={styles.management}
        isNamesVisible={isNamesVisible} // Передаем состояние в GanttChartManagement
        setIsNamesVisible={setIsNamesVisible} // Передаем функцию для обновления состояния
      />

      <div className={styles.container}>
        {isNamesVisible && (
          <div className={styles.names}>
            {/* Содержимое div с классом names */}
          </div>
        )}
        <div className={styles.charts}></div>
      </div>
    </>
  );
};

export default GanttChart;
