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
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

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

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;
    setInputValue(newValue);
    if (newValue.includes(" ")) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
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
          <input type="text" placeholder="Enter answer here" value={inputValue} onChange={(ev) => handleChange(ev)} />
          {isPlayerAnswerValid === "False" && <div className="error">Wrong answer.</div>}
          {isPlayerAnswerValid === "True" && <div className="input">True answer.</div>}
          {isSubmitDisabled && <div className="error">Answer must consist of one word only!</div>}
        </div>
        <div className={styles.modalFooter}>
          <h4>Active player: Player {activePlayerIndex}</h4>
          <button className={styles.submitButton} onClick={handleSubmit} disabled={isSubmitDisabled}>
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
