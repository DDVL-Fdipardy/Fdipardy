import { useState } from "react";
import { IQuestionBoxProps } from "./IQuestionBoxProps";
import styles from "./QuestionBox.module.css";
import QuestionModal from "../QuestionModal/QuestionModal";

const QuestionBox = (props: IQuestionBoxProps) => {
  const { score, question, answer } = props;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isPlayerAnswerValid, setIsPlayerAnswerValid] = useState("");

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (playerAnswer: string) => {
    if (playerAnswer.toLowerCase() === answer.toLowerCase()) {
      setIsPlayerAnswerValid("True");
      setTimeout(() => {
        setIsModalVisible(false);
        setIsPlayerAnswerValid("");
        //TODO: callback which player index gets the points!
      }, 1000);
    } else {
      setIsPlayerAnswerValid("False");
    }
  };

  return (
    <>
      <div className={styles.box} onClick={() => setIsModalVisible(true)}>
        {score}
      </div>
      <div>
        <QuestionModal
          onClose={handleClose}
          handleSubmit={handleSubmit}
          isPlayerAnswerValid={isPlayerAnswerValid}
          isModalVisible={isModalVisible}
          answer={answer}
          question={question}
        />
      </div>
    </>
  );
};

export default QuestionBox;
