import React, { useState } from "react";
import GanttChartManagement from "../GanttChartManagement/GanttChartManagement";
import styles from "./GanttChart.module.css";
import ZoomControl from "../ZoomControl/ZoomControl";
import DateStrip from "../DateStrip/DateStrip";

const GanttChart = ({ data }) => {
  const [isNamesVisible, setIsNamesVisible] = useState(false);
  console.log(data); // работает

  return (
    <>
      <GanttChartManagement
        className={styles.management}
        isNamesVisible={isNamesVisible} // Передаем состояние в GanttChartManagement
        setIsNamesVisible={setIsNamesVisible} // Передаем функцию для обновления состояния
      />
      <div className={styles.container}>
        {isNamesVisible && <div className={styles.names}></div>}

        <div className={styles.containerСharts}>
          <div className={styles.charts}>
            <ZoomControl>
              <div>
                <div className={styles.comp}></div>
                <br />
                <div className={styles.comp}></div>
                <br />
                <div className={styles.comp}></div>
              </div>
            </ZoomControl>
          </div>

          <div className={styles.date}>
            {/*             <ZoomControl>
              <div className={styles.comp2}></div>
            </ZoomControl>
            */}
            <DateStrip tasks={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GanttChart;
