import { IQuestionModalProps } from "./IQuestionModalProps";
import styles from "./QuestionModal.module.css";
import { useEffect, useRef, useState } from "react";

const QuestionModal = (props: IQuestionModalProps) => {
  const {
    isModalVisible,
    question,
    isValid,
    valueRef,
    answer,
    players,
    activePlayerIndex,
    onClose,
    handleSubmit,
    handleInputChange,
  } = props;

  if (!isModalVisible) {
    return <></>;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{question}</h2>
        </div>
        <div className={styles.modalBody}>
          <input type="text" placeholder="Enter answer here" ref={valueRef} onChange={(ev) => handleInputChange(ev)} />
          {isValid === "False" && <div className="error">Wrong answer.</div>}
          {isValid === "True" && <div className="input">True answer.</div>}
        </div>
        <div className={styles.modalFooter}>
          <h4>Active: {players[activePlayerIndex].name}</h4>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
