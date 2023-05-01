import { useEffect, useState } from "react";
import nextId from "react-id-generator";
import PlayerBox from "../PlayerBox/PlayerBox";
import QuestionBox from "../QuestionBox/QuestionBox";
import styles from "./MainContainer.module.css";
import { httpService } from "../../Services/httpService";
import { ICategory, IFullCategory } from "../../Types/ICategory";
import { IAnswer } from "../../Types/IAnswer";
import { generateFullCategories } from "../../Helpers/helper";
import { Player } from "./IPlayer";

const MainContainer = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [fullCategories, setFullCategories] = useState<IFullCategory[]>([]);
  const [player1, setPlayer1] = useState<Player>({ name: "Player 1", points: 0 });
  const [player2, setPlayer2] = useState<Player>({ name: "Player 2", points: 0 });
  const [player3, setPlayer3] = useState<Player>({ name: "Player 3", points: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const responseTopics: ICategory[] | null = await new httpService().getCategories();
      if (responseTopics) setCategories(responseTopics);
      const responseAnswers: IAnswer[] | null = await new httpService().getAnswers();
      if (responseAnswers) setAnswers(responseAnswers);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const extendedTopics: IFullCategory[] = generateFullCategories(categories, answers);
    setFullCategories(extendedTopics);
  }, [categories, answers]);

  const generateQuestionBoxColumns = (category: IFullCategory): JSX.Element => {
    const generatedBoxes: JSX.Element[] = [
      <div key={nextId()} className={styles.category}>
        {category.title}
      </div>,
    ];

    category.questions.forEach((question) => {
      generatedBoxes.push(
        <QuestionBox key={question.id} score={question.points} question={question.title} answer={question.answer} />
      );
    });

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
        {fullCategories.map((category) => generateQuestionBoxColumns(category))}
      </div>
      <div className={styles.playerContainer}>
        <PlayerBox key={"player1"} name={player1.name} score={player1.points} color={"rgb(223, 255, 216)"} />
        <PlayerBox key={"player2"} name={player2.name} score={player2.points} color={"rgb(254, 222, 255)"} />
        <PlayerBox key={"player3"} name={player3.name} score={player3.points} color={"rgb(223, 255, 216)"} />
      </div>
    </div>
  );
};

export default MainContainer;
