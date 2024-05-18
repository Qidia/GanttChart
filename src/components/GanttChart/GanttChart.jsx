import React, { useState } from "react";
import GanttChartManagement from "../GanttChartManagement/GanttChartManagement";
import styles from "./GanttChart.module.css";
import Grid from "../Grid/Grid";
import Button from "../UI/Button/Button";

/**
 * Компонент диаграмма Ганта.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.data - Данные для отображения на графике.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const GanttChart = ({ data }) => {
  const [isNamesVisible, setIsNamesVisible] = useState(false);
  const [isLineVisible, setIsLineVisible] = useState(false);

  return (
    <>
      {/* Компонент управления параметрами графика */}
      <GanttChartManagement
        className={styles.management}
        isNamesVisible={isNamesVisible} // Передаем состояние видимости имен в GanttChartManagement
        setIsNamesVisible={setIsNamesVisible} // Передаем функцию для обновления состояния видимости имен
        isLineVisible={isLineVisible} // Передаем состояние видимости линии в GanttChaentrtManagem
        setIsLineVisible={setIsLineVisible} // Передаем функцию для обновления состояния видимости линии
      />

      <div className={styles.container}>
        {isNamesVisible && (
          <div className={styles.departmentsNames}>
            <h3>Список подразделений</h3>
            <div className={styles.departmentName}>
              <div className="m-l-15">
                {/* Отображение кнопок для выбора отдела */}
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
            {/* Компонент отображения сетки графика и задач */}
            <Grid data={data} isLineVisible={isLineVisible}></Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default GanttChart;
