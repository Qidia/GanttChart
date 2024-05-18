import React, { useState, useEffect } from "react";

/**
 * Компонент, предоставляющий данные из db.json.
 * @param {Object} props - Свойства компонента.
 * @param {ReactNode} props.children - Дочерние компоненты, которые используют данные.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    /**
     * Функция для загрузки данных из db.json.
     */
    const fetchData = async () => {
      try {
        const response = await fetch("/api/departments"); // Путь к API маршруту
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Вызов функции загрузки данных
  }, []); // useEffect вызывается только при монтировании компонента

  return (
    <>
      {data &&
        React.Children.map(children, (child) =>
          React.cloneElement(child, { data })
        )}
    </>
  );
};

export default DataProvider;
