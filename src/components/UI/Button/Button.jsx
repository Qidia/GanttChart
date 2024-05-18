import React from "react";

/**
 * Компонент кнопки.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.prefix - Префикс кнопки.
 * @param {string} props.type - Тип кнопки.
 * @param {ReactNode} props.children - Дочерние элементы кнопки.
 * @param {string} props.className - Классы стилей кнопки.
 * @param {string} props.key - Уникальный ключ кнопки.
 * @returns {JSX.Element} - Элемент JSX кнопки.
 */
const Button = ({ prefix, type, children, className, key }) => {
  return (
    <button className={className} type={type} key={key}>
      {prefix && <div>{prefix}</div>}
      {children}
    </button>
  );
};

export default Button;
