import { cloneDeep } from "lodash";
import { IQuestionModalProps } from "./IQuestionModalProps";
import styles from "./QuestionModal.module.css";
import { useEffect, useState } from "react";

const QuestionModal = (props: IQuestionModalProps) => {
  const { isModalVisible, question, isPlayerAnswerValid, onClose, handleSubmit } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [playerIndexes, setPlatyerIndexes] = useState<number[]>([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number | null>(null);

  useEffect(() => {
    const playerIdxs = [1, 2, 3];
    setPlatyerIndexes(playerIdxs);
    addKeyDownEventListener();
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    const pressedKeyAsNumber = Number(event.key);
    if (playerIndexes.includes(pressedKeyAsNumber)) {
      setActivePlayerIndex(pressedKeyAsNumber);
      // const idxInPlayerArray = playerIndexes.indexOf(pressedKeyAsNumber);
      // const newIndexes = cloneDeep(playerIndexes);
      // newIndexes.splice(idxInPlayerArray, 1);
      // setPlatyerIndexes(newIndexes);
      // console.log("Active index: ", pressedKeyAsNumber);
      //console.log("Player indexesa after splice: ", newIndexes);
    }
  };

  const addKeyDownEventListener = () => {
    document.addEventListener("keydown", handleKeyDown);
  };

  // const removeKeyDownEventListener = () => {
  //   document.removeEventListener("keydown", handleKeyDown);
  // };

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
          <button className={styles.submitButton} onClick={() => handleSubmit(inputValue)}>
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
