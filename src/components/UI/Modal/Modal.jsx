import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

/**
 * Модальное окно.
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Флаг, указывающий, открыто ли модальное окно.
 * @param {string} props.titleModal - Заголовок модального окна.
 * @param {Function} props.onClose - Функция обратного вызова при закрытии модального окна.
 * @param {ReactNode} props.children - Дочерние элементы модального окна.
 * @returns {ReactNode} - Возвращает элемент модального окна или null, если окно закрыто.
 */
export const Modal = ({ isOpen, titleModal, onClose, children }) => {
  /* Обработка закрытия модалки по клику на крестик */
  const handleClose = () => onClose();

  // Создаем ссылку на DOM-элемент модального окна
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Проверяем, был ли клик вне модального окна
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Закрываем модалку
        onClose();
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Если модально окно открыто и код выполняется на клиенте
    if (isOpen && typeof window !== "undefined") {
      // Добавляем слушатель события mousedown для закрытия модалки по клику вне
      document.addEventListener("mousedown", handleOutsideClick);
      // Добавляем слушатель события keydown (нажатие клавиши Esc)
      document.addEventListener("keydown", handleKeyPress);
    }

    // Очищаем слушатель события при размонтировании компонента или при закрытии
    return () => {
      // Если  модальное окно открыто и код выполняется на клиенте
      if (isOpen && typeof window !== "undefined") {
        // Удаляем слушатель события mousedown для закрытия модалки по клику вне
        document.removeEventListener("mousedown", handleOutsideClick);
        // Удаляем слушатель события keydown
        document.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [isOpen, onClose]);

  return (
    isOpen &&
    createPortal(
      <div className={styles.modalContainer}>
        <div ref={modalRef} className={styles.modalContent}>
          <header className={styles.modalHeader}>
            <h2 className={styles.modalHeaderTitle}>{titleModal}</h2>
            <Button onClick={handleClose} className={styles.closeButton}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="1 0 30 30"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z"></path>
              </svg>
            </Button>
          </header>
          <main className={styles.modalMain}>{children}</main>
        </div>
      </div>,
      document.body
    )
  );
};
