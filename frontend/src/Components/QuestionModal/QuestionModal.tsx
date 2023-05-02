import { ModalMessages } from "../../Helpers/ModalMessages";
import { checkWhitespaces } from "../../Helpers/helper";
import { IQuestionModalProps } from "./IQuestionModalProps";
import styles from "./QuestionModal.module.css";
import { useEffect, useState } from "react";

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
  const [messageState, setMessageState] = useState(ModalMessages.EMPTY);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (activePlayerIndex === null) {
      setIsSubmitDisabled(true);
      setMessageState(ModalMessages.NOPLAYER);
    } else {
      setIsSubmitDisabled(false);
      setMessageState(ModalMessages.EMPTY);
    }
  }, [activePlayerIndex]);

  const handleSubmit = () => {
    if (inputValue.toLowerCase() === answer.toLowerCase()) {
      setMessageState(ModalMessages.TRUE);
      setTimeout(() => {
        onClose(false);
      }, 1000);
    } else {
      setMessageState(ModalMessages.FALSE);
      addListener();
      if (activePlayersLength === 0) {
        setMessageState(ModalMessages.NOWINNER);
        setTimeout(() => {
          onClose(true);
        }, 2000);
        return;
      }
    }
    setTimeout(() => {
      modalCleanUp();
    }, 2000);
  };

  const modalCleanUp = () => {
    setMessageState(ModalMessages.EMPTY);
    setInputValue("");
    resetActivePlayer();
  };

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    if (checkWhitespaces(newValue)) {
      setIsSubmitDisabled(true);
      setMessageState(ModalMessages.LONG);
      return;
    }
    setIsSubmitDisabled(false);
    setMessageState(ModalMessages.EMPTY);
  };

  const handleDisplayMessage = () => {
    let message = "";

    switch (messageState) {
      case ModalMessages.TRUE:
        message = "True answer!";
        break;
      case ModalMessages.FALSE:
        message = "Wrong answer!";
        break;
      case ModalMessages.NOWINNER:
        message = `Right answer: ${answer}`;
        break;
      case ModalMessages.LONG:
        message = "Answer must consist of one word only!";
        break;
      case ModalMessages.NOPLAYER:
        message = "Player must be selected!";
        break;
      default:
        break;
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
