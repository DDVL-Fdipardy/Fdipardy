import { IQuestionModalProps } from "./IQuestionModalProps";
import styles from "./QuestionModal.module.css";
import { useState } from "react";

const QuestionModal = (props: IQuestionModalProps) => {
  const {
    isModalVisible,
    question,
    answer,
    activePlayerIndex,
    activePlayersLength,
    onClose,
    addListener,
    resetActivePlayer,
  } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [isPlayerAnswerValid, setIsPlayerAnswerValid] = useState("");

  const handleSubmit = () => {
    if (inputValue.toLowerCase() === answer.toLowerCase()) {
      setIsPlayerAnswerValid("True");
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setIsPlayerAnswerValid("False");
      addListener();
      if (activePlayersLength === 0) {
        setTimeout(() => {
          resetActivePlayer(); //avoid race condition with cleanup
          onClose();
        }, 1000);
      }
    }
    setTimeout(() => {
      modalCleanUp();
    }, 2000);
  };

  const modalCleanUp = () => {
    setIsPlayerAnswerValid("");
    setInputValue("");
    resetActivePlayer();
  };

  if (!isModalVisible) {
    return <></>;
  }

  return (
    <div className={styles.modal} id="modal">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{question}</h2>
        </div>
        <div className={styles.modalBody}>
          <input
            type="text"
            placeholder="Enter answer here"
            value={inputValue}
            onChange={(ev) => setInputValue(ev.target.value)}
          />
          {isPlayerAnswerValid === "False" && <div className="error">Wrong answer.</div>}
          {isPlayerAnswerValid === "True" && <div className="input">True answer.</div>}
        </div>
        <div className={styles.modalFooter}>
          <h4>Active player: Player {activePlayerIndex}</h4>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
          {/* <button className={styles.closeButton} onClick={onClose}>
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
