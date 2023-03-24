import nextId from "react-id-generator";
import PlayerBox from "../PlayerBox/PlayerBox";
import QuestionBox from "../QuestionBox/QuestionBox";
import styles from "./MainContainer.module.css";

const MainContainer = () => {
  const generateQuestionBoxColumns = (): JSX.Element => {
    const generatedBoxes: JSX.Element[] = [<div className={styles.category}>Category</div>];

    let boxScore = 100;
    for (let i = 0; i < 4; i++) {
      generatedBoxes.push(<QuestionBox key={nextId()} score={boxScore} />);
      boxScore += 100;
    }

    return (
      <div key={nextId()} className={styles.columnItems}>
        {generatedBoxes}
      </div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <p className={styles.paragraph}>Welcome to</p>
      <h1 className={styles.title}>FDIPARDY</h1>
      <div className={styles.questionsContainer}>
        {generateQuestionBoxColumns()}
        {generateQuestionBoxColumns()}
        {generateQuestionBoxColumns()}
        {generateQuestionBoxColumns()}
        {generateQuestionBoxColumns()}
      </div>
      <div className={styles.playerContainer}>
        <PlayerBox key={"player1"} name={"Player 1"} score={100} color={"rgb(223, 255, 216)"} />
        <PlayerBox key={"player2"} name={"Player 2"} score={100} color={"rgb(254, 222, 255)"} />
        <PlayerBox key={"player3"} name={"Player 3"} score={100} color={"rgb(223, 255, 216)"} />
      </div>
    </div>
  );
};

export default MainContainer;
