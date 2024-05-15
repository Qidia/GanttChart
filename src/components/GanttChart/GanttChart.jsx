import React, { useState } from "react";
import GanttChartManagement from "../GanttChartManagement/GanttChartManagement";
import styles from "./GanttChart.module.css";
import ZoomControl from "../ZoomControl/ZoomControl";
import Grid from "../Grid/Grid";

const GanttChart = ({ data }) => {
  const [isNamesVisible, setIsNamesVisible] = useState(false);
  const [isLineVisible, setIsLineVisible] = useState(false);

  return (
    <>
      <GanttChartManagement
        className={styles.management}
        isNamesVisible={isNamesVisible} // Передаем состояние в GanttChartManagement
        setIsNamesVisible={setIsNamesVisible} // Передаем функцию для обновления состояния
        isLineVisible={isLineVisible}
        setIsLineVisible={setIsLineVisible}
      />
      <div className={styles.container}>
        {isNamesVisible && <div className={styles.names}></div>}

        <div className={styles.containerСharts}>
          <div className={styles.charts}>
            {/*                         <ZoomControl>
             */}
            <Grid data={data} isLineVisible={isLineVisible}></Grid>
            {/*                         </ZoomControl>
             */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GanttChart;
