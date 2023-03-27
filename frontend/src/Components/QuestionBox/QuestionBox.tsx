import { IQuestionBoxProps } from "./IQuestionBoxProps";
import styles from "./QuestionBox.module.css";

const QuestionBox = (props: IQuestionBoxProps) => {
  const { score, question, answer, onQuestionClick } = props;
  return (
    <div className={styles.box} onClick={() => onQuestionClick(question, answer)}>
      {score}
    </div>
  );
};

export default QuestionBox;
