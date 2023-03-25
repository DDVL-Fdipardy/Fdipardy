import { useEffect, useState } from "react";
import nextId from "react-id-generator";
import PlayerBox from "../PlayerBox/PlayerBox";
import QuestionBox from "../QuestionBox/QuestionBox";
import styles from "./MainContainer.module.css";
import { httpService } from "../../Services/httpService";
import { ICategory, IFullCategory } from "../../Types/ICategory";
import { IAnswer } from "../../Types/IAnswer";
import { generateFullCategories } from "../../Helpers/helper";

const MainContainer = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [fullCategories, setFullCategories] = useState<IFullCategory[]>([]);

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

    category.questions.map((question) => {
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
      <h1 className={styles.title}>FDIPARDY</h1>
      <div className={styles.questionsContainer}>
        {fullCategories.map((category) => generateQuestionBoxColumns(category))}
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
