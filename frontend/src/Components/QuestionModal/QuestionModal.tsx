import { IQuestionModalProps } from "./IQuestionModalProps";
import styles from "./QuestionModal.module.scss";

const QuestionModal = (props: IQuestionModalProps) => {
  const { isModalVisible, question, answer } = props;

  if (!isModalVisible) {
    return <></>;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{question}</h2>
        </div>
        <div className={styles.modalBody}>{answer}</div>
        <div className={styles.modalFooter}>
          <button className="button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
