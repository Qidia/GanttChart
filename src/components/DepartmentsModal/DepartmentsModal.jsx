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
 * @param {Object} props.task - Данные о задаче.
 * @param {number} props.taskIndex - Индекс задачи.
 * @returns {ReactNode} - Возвращает элемент модального окна или null, если окно закрыто.
 */
const DepartmentsModal = ({ isOpen, onClose, department, task, taskIndex }) => {
  return (
    <div className={styles.overlay}>
      <Modal
        isOpen={isOpen}
        titleModal={`${task ? task.title : department.name}`}
        onClose={onClose}
        type="DepartmentsModal"
      >
        <div className={styles.modalContent}>
          {task ? (
            <Grid
              data={[{ ...department, tasks: [task] }]}
              isLineVisible={false}
              showSubtasks={true}
              outlineColor={false}
            />
          ) : (
            <Grid
              data={[department]}
              isLineVisible={false}
              showSubtasks={false}
              outlineColor={true}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DepartmentsModal;
