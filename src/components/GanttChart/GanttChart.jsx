import React, { useState } from "react";
import GanttChartManagement from "../GanttChartManagement/GanttChartManagement";
import styles from "./GanttChart.module.css";
import ZoomControl from "../ZoomControl/ZoomControl";
import Grid from "../Grid/Grid";
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
              <Grid data={data}></Grid>
            </ZoomControl>
          </div>

          <div className={styles.date}>
            {/* <DateStrip /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GanttChart;
