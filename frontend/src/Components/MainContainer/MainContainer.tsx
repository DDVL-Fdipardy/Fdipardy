import QuestionBox from "../QuestionBox/QuestionBox";
import styles from "./MainContainer.module.css";

const MainContainer = () => {
  const generateQuestionBoxColumns = (): JSX.Element => {
    const generatedBoxes: JSX.Element[] = [<div className={styles.category}>Category</div>];

    let boxScore = 100;
    for (let i = 0; i < 4; i++) {
      generatedBoxes.push(<QuestionBox score={boxScore} />);
      boxScore += 100;
    }

    return <div className={styles.columnItems}>{generatedBoxes}</div>;
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>FDIPARDY</h1>
      <div className={styles.questionsContainer}>
        {generateQuestionBoxColumns()}
        {generateQuestionBoxColumns()}
        {generateQuestionBoxColumns()}
        {generateQuestionBoxColumns()}
        {generateQuestionBoxColumns()}
      </div>
    </div>
  );
};

export default MainContainer;
