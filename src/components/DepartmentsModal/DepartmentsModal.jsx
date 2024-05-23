import React from "react";
import { Modal } from "../UI/Modal/Modal";
import styles from "./DepartmentsModal.module.css";
import Grid from "../Grid/Grid";

/**
 * Модальное окно для отображения информации о подразделении.
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Флаг, указывающий, открыто ли модальное окно.
 * @param {Function} props.onClose - Функция обратного вызова при закрытии модального окна.
 * @param {Object} props.department - Данные о подразделении.
 * @returns {ReactNode} - Возвращает элемент модального окна или null, если окно закрыто.
 */
const DepartmentsModal = ({ isOpen, onClose, department }) => {
  return (
    <div className={styles.overlay}>
      <Modal
        isOpen={isOpen}
        titleModal={department.name}
        onClose={onClose}
        type="DepartmentsModal"
      >
        <div className={styles.modalContent}>
          <Grid
            data={[department]}
            isLineVisible={false}
            showArrows={true}
            showSubtasks={true}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DepartmentsModal;
