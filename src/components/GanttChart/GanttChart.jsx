import React, { useState } from "react";
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

  // Генерация уникальных цветов для отделов с помощью randomColor
  const uniqueColors = randomColor({
    count: data.length,
    luminosity: "bright",
    hue: "random",
  });

  // Функция для получения цвета задачи в зависимости от статуса
  const getStatusColor = (status) => {
    switch (status) {
      case "не назначена":
        return "#90908c";
      case "назначена":
        return "#00CED1";
      case "в работе":
        return "#4682B4";
      case "закрыта":
        return "#00FF7F";
      case "условно закрыта":
        return "#EE82EE";
      case "частично закрыта":
        return "#9400D3";
      default:
        return "#e94639";
    }
  };

  // Добавляем уникальные идентификаторы и цвета для элементов данных
  const uniqueData = data.map((department, deptIndex) => ({
    ...department,
    uniqueId: `${department.id || "department"}-${deptIndex}`,
    tasks: department.tasks.map((task, taskIndex) => ({
      ...task,
      color:
        selectedOption === "По подразделениям"
          ? uniqueColors[deptIndex]
          : getStatusColor(task.status), // Изменение цвета задач в зависимости от выбранной опции
    })),
  }));

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
              data={uniqueData}
              isLineVisible={isLineVisible}
              showSubtasks={false}
            />
          </div>
        </div>
      </div>

      {/* Модальное окно для выбранного отдела */}
      {selectedDepartment && (
        <DepartmentsModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          department={selectedDepartment}
        />
      )}
    </>
  );
};

export default GanttChart;
