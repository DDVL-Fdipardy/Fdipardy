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
import { cloneDeep } from "lodash";

const MainContainer = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [fullCategories, setFullCategories] = useState<IFullCategory[]>([]);
  const [player1, setPlayer1] = useState<number>(0);
  const [player2, setPlayer2] = useState<number>(0);
  const [player3, setPlayer3] = useState<number>(0);
  const [questions, setQuestions] = useState<JSX.Element[]>([]);

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
    const allQuestions = fullCategories.map((category) => generateQuestionBoxColumns(category));
    setQuestions(allQuestions);
  }, [categories, answers]);

  const handlePointsDistribution = (playerIdx: number | null, points: number) => {
    console.log(playerIdx);
    if (playerIdx === 1) {
      setPlayer1((prevPlayer1) => prevPlayer1 + points);
    } else if (playerIdx === 2) {
      setPlayer2((prevPlayer2) => prevPlayer2 + points);
    } else if (playerIdx === 3) {
      setPlayer3((prevPlayer3) => prevPlayer3 + points);
    }
  };

  const generateQuestionBoxColumns = (category: IFullCategory): JSX.Element => {
    const generatedBoxes: JSX.Element[] = [
      <div key={nextId()} className={styles.category}>
        {category.title}
      </div>,
    ];

    category.questions.forEach((question) => {
      generatedBoxes.push(
        <QuestionBox
          key={question.id}
          score={question.points}
          question={question.title}
          answer={question.answer}
          onPointsDistribution={handlePointsDistribution}
        />
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
      <div className={styles.questionsContainer}>{questions}</div>
      <div className={styles.playerContainer}>
        <PlayerBox key={"player1"} name={"Player 1"} score={player1} color={"rgb(223, 255, 216)"} />
        <PlayerBox key={"player2"} name={"Player 2"} score={player2} color={"rgb(254, 222, 255)"} />
        <PlayerBox key={"player3"} name={"Player 3"} score={player3} color={"rgb(223, 255, 216)"} />
      </div>
    </div>
  );
};

export default MainContainer;
