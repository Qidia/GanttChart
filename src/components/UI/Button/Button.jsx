import React from "react";

/**
 * Компонент кнопки.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.prefix - Префикс кнопки.
 * @param {string} props.type - Тип кнопки.
 * @param {ReactNode} props.children - Дочерние элементы кнопки.
 * @param {string} props.className - Классы стилей кнопки.
 * @param {string} props.id - Уникальный идентификатор кнопки.
 * @param {Function} props.onClick - Обработчик клика кнопки.
 * @returns {JSX.Element} - Элемент JSX кнопки.
 */
const Button = ({ prefix, type, children, className, id, onClick }) => {
  return (
    <button
      className={className}
      type={type}
      id={id}
      onClick={onClick}
      title={typeof children === "string" ? children : null} // добавляем title для отображения полного текста при наведении
    >
      {prefix && <div>{prefix}</div>}
      {children}
    </button>
  );
};

export default Button;
