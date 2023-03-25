import { useEffect, useState } from "react";
import nextId from "react-id-generator";
import PlayerBox from "../PlayerBox/PlayerBox";
import QuestionBox from "../QuestionBox/QuestionBox";
import styles from "./MainContainer.module.css";
import { httpService } from "../../Services/httpService";
import { ICategory } from "../../Types/ICategory";

const MainContainer = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response: ICategory[] | null = await new httpService().getCategories();
      if (response) setCategories(response);
    };

    fetchData();
  }, []);

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

  console.log("Final categories: ", categories);
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
      <div className={styles.playerContainer}>
        <PlayerBox key={"player1"} name={"Player 1"} score={100} color={"aquamarine"} />
        <PlayerBox key={"player2"} name={"Player 2"} score={100} color={"salmon"} />
        <PlayerBox key={"player3"} name={"Player 3"} score={100} color={"lightgreen"} />
      </div>
    </div>
  );
};

export default MainContainer;
