import { IQuestionBoxProps } from "./IQuestionBoxProps";
import styles from "./QuestionBox.module.css";

const QuestionBox = (props: IQuestionBoxProps) => {
  return (
    <div className={styles.box} onClick={() => console.log(props.question, props.answer)}>
      {props.score}
    </div>
  );
};

export default QuestionBox;
