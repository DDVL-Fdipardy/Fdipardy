import { useState } from "react";
import { IQuestionBoxProps } from "./IQuestionBoxProps";
import styles from "./QuestionBox.module.css";
import QuestionModal from "../QuestionModal/QuestionModal";
import { cloneDeep } from "lodash";

const QuestionBox = (props: IQuestionBoxProps) => {
  const { score, question, answer, onPointsDistribution } = props;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [playerIndexes, setPlayerIndexes] = useState<number[]>([1, 2, 3]);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (isDisabled) return;
    setIsModalVisible(true);
    addKeyDownEventListener();
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setIsDisabled(true);
    onPointsDistribution(activePlayerIndex, score);
    setPlayerIndexes([1, 2, 3]);
    setActivePlayerIndex(null);
    removeKeyDownEventListener();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const pressedKeyAsNumber = Number(event.key);
    if (playerIndexes.includes(pressedKeyAsNumber)) {
      setActivePlayerIndex(pressedKeyAsNumber);
      const idxInPlayerArray = playerIndexes.indexOf(pressedKeyAsNumber);
      const newIndexes = cloneDeep(playerIndexes);
      newIndexes.splice(idxInPlayerArray, 1);
      setPlayerIndexes(newIndexes);
      removeKeyDownEventListener();
    }
  };

  const addKeyDownEventListener = () => {
    document.addEventListener("keydown", handleKeyDown);
  };

  const removeKeyDownEventListener = () => {
    document.removeEventListener("keydown", handleKeyDown);
  };

  const resetActivePlayer = () => {
    setActivePlayerIndex(null);
  };

  console.log("Question ", question);
  return (
    <>
      <div className={isDisabled ? `${styles.box} ${styles.disabled}` : styles.box} onClick={handleClick}>
        {score}
      </div>
      <div>
        <QuestionModal
          onClose={handleClose}
          addListener={addKeyDownEventListener}
          isModalVisible={isModalVisible}
          answer={answer}
          question={question}
          activePlayerIndex={activePlayerIndex}
          activePlayersLength={playerIndexes.length}
          resetActivePlayer={resetActivePlayer}
        />
      </div>
    </>
  );
};

export default QuestionBox;
