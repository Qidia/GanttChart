import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range"; // Импорт компонента DateRange из библиотеки react-date-range

import format from "date-fns/format"; // Импорт функции форматирования даты из библиотеки date-fns
import { addDays } from "date-fns"; // Импорт функции добавления дней к дате из библиотеки date-fns

import "react-date-range/dist/styles.css"; // Импорт стилей компонента DateRange
import "react-date-range/dist/theme/default.css"; // Импорт дефолтной темы компонента DateRange

import styles from "./DateRangeProduction.module.css"; // Импорт модуля стилей компонента DateRangeComp

/**
 * Компонент для выбора диапазона дат.
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
const DateRangeProduction = () => {
  // Состояние для диапазона дат
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
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

  // Функция для скрытия календаря при клике за его пределами
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
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
        onClick={() => setOpen((open) => !open)}
      />

      {/* Компонент DateRange */}
      <div className={styles.calendar} ref={refOne}>
        {/* Рендер компонента DateRange при открытом состоянии */}
        {open && (
          <DateRange
            className={styles.dateRange}
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeProduction;
