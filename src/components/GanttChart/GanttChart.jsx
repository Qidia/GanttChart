import React, { useState, useEffect } from "react";
import styles from "./GanttChart.module.css";
import GanttChartManagement from "../GanttChartManagement/GanttChartManagement";
import Grid from "../Grid/Grid";
import Button from "../UI/Button/Button";
import DepartmentsModal from "../DepartmentsModal/DepartmentsModal";
import randomColor from "randomcolor";

/**
 * Компонент диаграмма Ганта.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.data - Данные для отображения на графике.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const GanttChart = ({ data }) => {
  // Состояние для управления видимостью имен отделов
  const [isNamesVisible, setIsNamesVisible] = useState(false);
  // Состояние для управления видимостью горизонтальной линии
  const [isLineVisible, setIsLineVisible] = useState(false);
  // Состояние для управления выбранной опцией отображения цветов
  const [selectedOption, setSelectedOption] = useState("По подразделениям");
  // Состояние для управления выбранным отделом
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  // Состояние для управления видимостью модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Состояние для хранения цветов отделов
  const [departmentColors, setDepartmentColors] = useState({});
  // Состояние для хранения диапазона дат
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // Генерация уникальных цветов для отделов с помощью randomColor и сохранение в состоянии
  useEffect(() => {
    if (data && data.length > 0) {
      const colors = randomColor({
        count: data.length,
        luminosity: "bright",
        hue: "random",
      });
      const colorsMap = data.reduce((acc, department, index) => {
        acc[department.id || `department-${index}`] = colors[index];
        return acc;
      }, {});
      setDepartmentColors(colorsMap);
    }
  }, [data]);

  // Обработчик нажатия кнопки для открытия модального окна
  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  // Обработчик закрытия модального окна
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  // Обработчик изменения диапазона дат
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    console.log("Selected date range:", range);
  };

  return (
    <>
      {/* Компонент управления параметрами графика */}
      <GanttChartManagement
        className={styles.management}
        isNamesVisible={isNamesVisible} // Передаем состояние видимости имен в GanttChartManagement
        setIsNamesVisible={setIsNamesVisible} // Передаем функцию для обновления состояния видимости имен
        isLineVisible={isLineVisible} // Передаем состояние видимости линии в GanttChartManagement
        setIsLineVisible={setIsLineVisible} // Передаем функцию для обновления состояния видимости линии
        setSelectedOption={setSelectedOption} // Передаем функцию для обновления выбранной опции
        onDateRangeChange={handleDateRangeChange} // Передаем функцию для обновления диапазона дат
      />

      <div className={styles.container}>
        {/* Рендеринг имен отделов */}
        {isNamesVisible && (
          <div className={styles.departmentsNames}>
            <h3>Список подразделений</h3>
            <div className={styles.departmentName}>
              <div className="m-l-15 m-r-15">
                {/* Отображение кнопок для выбора отдела */}
                {data.map((department, index) => (
                  <Button
                    key={department.id || `department-${index}`} // Используем ключ для идентификации элемента в списке
                    className={styles.departmentButton}
                    onClick={() => handleDepartmentClick(department)}
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
            <Grid
              data={data} // Передаем данные для отображения
              isLineVisible={isLineVisible} // Передаем состояние видимости линии
              showSubtasks={false} // Передаем состояние видимости подзадач
              departmentColors={departmentColors} // Передаем цвета отделов
              selectedOption={selectedOption} // Передаем выбранную опцию
              dateRange={dateRange} // Передаем диапазон дат
            />
          </div>
        </div>
      </div>

      {/* Модальное окно для выбранного отдела */}
      {selectedDepartment && (
        <DepartmentsModal
          isOpen={isModalOpen} // Передаем состояние видимости модального окна
          onClose={handleModalClose} // Передаем функцию для закрытия модального окна
          department={selectedDepartment} // Передаем данные выбранного отдела
        />
      )}
    </>
  );
};

export default GanttChart;
