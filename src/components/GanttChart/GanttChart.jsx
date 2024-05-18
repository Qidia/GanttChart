import React, { useState } from "react";
import styles from "./GanttChart.module.css";
import GanttChartManagement from "../GanttChartManagement/GanttChartManagement";
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

  // Добавляем уникальные идентификаторы для элементов данных
  const uniqueData = data.map((department, index) => ({
    ...department,
    uniqueId: `${department.id || "department"}-${index}`,
  }));

  return (
    <>
      {/* Компонент управления параметрами графика */}
      <GanttChartManagement
        className={styles.management}
        isNamesVisible={isNamesVisible} // Передаем состояние видимости имен в GanttChartManagement
        setIsNamesVisible={setIsNamesVisible} // Передаем функцию для обновления состояния видимости имен
        isLineVisible={isLineVisible} // Передаем состояние видимости линии в GanttChartManagement
        setIsLineVisible={setIsLineVisible} // Передаем функцию для обновления состояния видимости линии
      />

      <div className={styles.container}>
        {isNamesVisible && (
          <div className={styles.departmentsNames}>
            <h3>Список подразделений</h3>
            <div className={styles.departmentName}>
              <div className="m-l-15 m-r-15">
                {/* Отображение кнопок для выбора отдела */}
                {uniqueData.map((department) => (
                  <Button
                    key={department.uniqueId} // Используем ключ для идентификации элемента в списке
                    id={department.uniqueId} // Используем id для передачи уникального идентификатора в компонент Button
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
          <div
            className={` ${styles.charts} ${
              isNamesVisible
                ? `${styles.openDepartmentName}`
                : `${styles.closeDepartmentName}`
            }`}
          >
            {/* Компонент отображения сетки графика и задач */}
            <Grid data={uniqueData} isLineVisible={isLineVisible} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GanttChart;
