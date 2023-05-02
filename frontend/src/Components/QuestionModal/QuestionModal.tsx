import { checkWhitespaces } from "../../Helpers/helper";
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
        onClose(false);
      }, 1000);
    } else {
      setIsPlayerAnswerValid("False");
      addListener();
      if (activePlayersLength === 0) {
        onClose(true);
        return;
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

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    setIsSubmitDisabled(checkWhitespaces(newValue));
  };

  const handleDisplayMessage = () => {
    let message = "";

    switch (isPlayerAnswerValid) {
      case "True":
        message = "True answer!";
        break;
      case "False":
        message = "Wrong answer!";
        break;
      default:
        break;
    }

    if (isSubmitDisabled) {
      message = "Answer must consist of one word only!";
    }

    return <div className="error">{message}</div>;
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
            onChange={(ev) => handleChange(ev.target.value)}
          />
          {handleDisplayMessage()}
        </div>
        <div className={styles.modalFooter}>
          <h4>Active player: Player {activePlayerIndex}</h4>
          <button className={styles.submitButton} onClick={handleSubmit} disabled={isSubmitDisabled}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
