import { useEffect, useRef, useState } from "react";
import styles from "./DateRangeProduction.module.css"; // Импорт модуля стилей компонента DateRangeProduction
import { DateRange } from "react-date-range"; // Импорт компонента DateRange из библиотеки react-date-range
import format from "date-fns/format"; // Импорт функции форматирования даты из библиотеки date-fns
import { addDays } from "date-fns"; // Импорт функции добавления дней к дате из библиотеки date-fns
import "react-date-range/dist/styles.css"; // Импорт стилей компонента DateRange
import "react-date-range/dist/theme/default.css"; // Импорт дефолтной темы компонента DateRange

/**
 * Компонент для выбора диапазона дат.
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onDateRangeChange - Функция, вызываемая при изменении диапазона дат.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const DateRangeProduction = ({ onDateRangeChange }) => {
  // Состояние для диапазона дат
  const [range, setRange] = useState([
    {
      startDate: new Date(), // Начальная дата диапазона
      endDate: addDays(new Date(), 7), // Конечная дата диапазона через 7 дней от текущей даты
      key: "selection", // Ключ для идентификации диапазона
    },
  ]);

  // Состояние для открытия/закрытия календаря
  const [open, setOpen] = useState(false);

  // Ссылка для доступа к DOM-элементу календаря
  const refOne = useRef(null);

  // Эффект для добавления слушателей событий при загрузке компонента
  useEffect(() => {
    // Слушатель события клика за пределами компонента для скрытия календаря
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  /**
   * Функция для скрытия календаря при клике за его пределами.
   * @param {Event} e - Событие клика.
   */
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false); // Закрываем календарь
    }
  };

  /**
   * Функция для обработки выбора диапазона дат.
   * @param {Object} item - Объект с выбранным диапазоном дат.
   */
  const handleSelect = (item) => {
    setRange([item.selection]); // Обновляем состояние диапазона дат
    onDateRangeChange(item.selection); // Вызываем функцию для передачи выбранного диапазона в родительский компонент
  };

  return (
    <div className={styles.calendarWrap}>
      {/* Поле ввода диапазона дат */}
      <input
        className={styles.dateInput}
        value={`${format(range[0].startDate, "dd/MM/yyyy")} до ${format(
          range[0].endDate,
          "dd/MM/yyyy"
        )}`}
        readOnly
        onClick={() => setOpen((open) => !open)} // Обработка клика для открытия/закрытия календаря
      />

      {/* Компонент DateRange */}
      <div className={styles.calendar} ref={refOne}>
        {/* Рендер компонента DateRange при открытом состоянии */}
        {open && (
          <DateRange
            className={styles.dateRange}
            onChange={handleSelect} // Обработка изменения диапазона дат
            editableDateInputs={true} // Включение возможности редактирования дат
            moveRangeOnFirstSelection={false} // Отключение перемещения диапазона при первой селекции
            ranges={range} // Передаем текущий диапазон дат
            months={1} // Отображение одного месяца в календаре
            direction="horizontal" // Горизонтальное направление календаря
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeProduction;
