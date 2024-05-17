import React, { useState } from "react";
import GanttChartManagement from "../GanttChartManagement/GanttChartManagement";
import styles from "./GanttChart.module.css";
import ZoomControl from "../ZoomControl/ZoomControl";
import Grid from "../Grid/Grid";
import Button from "../UI/Button/Button";

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
        {isNamesVisible && (
          <div className={styles.departmentsNames}>
            <h3>Список подразделений</h3>
            <div className={styles.departmentName}>
              <div className="m-l-15">
                {data.map((department) => (
                  <Button
                    key={department.id}
                    className={styles.departmentButton}
                  >
                    {department.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

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
