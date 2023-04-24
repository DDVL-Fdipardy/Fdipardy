import { useEffect, useRef, useState } from "react";
import { cloneDeep } from "lodash";
import nextId from "react-id-generator";
import PlayerBox from "../PlayerBox/PlayerBox";
import QuestionBox from "../QuestionBox/QuestionBox";
import styles from "./MainContainer.module.css";
import { httpService } from "../../Services/httpService";
import { ICategory, IFullCategory } from "../../Types/ICategory";
import { IAnswer } from "../../Types/IAnswer";
import { generateFullCategories } from "../../Helpers/helper";
import QuestionModal from "../QuestionModal/QuestionModal";
import { IPlayerBoxProps } from "../PlayerBox/IPlayerBoxProps";

type Player = {
  name: string;
  points: number;
};

const MainContainer = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [fullCategories, setFullCategories] = useState<IFullCategory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isValid, setIsValid] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const valueRef = useRef<string>("");
  const [questionPoints, setQuestionPoints] = useState<IPlayerBoxProps | null>(null);
  const [player1, setPlayer1] = useState<Player>({ name: "Player 1", points: 0 });
  const [player2, setPlayer2] = useState<Player>({ name: "Player 2", points: 0 });
  const [player3, setPlayer3] = useState<Player>({ name: "Player 3", points: 0 });
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const players = [player1, player2, player3];
  const [currentPlayer, setCurrentPlayer] = useState<string>("Player 1");

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
        <QuestionBox
          key={question.id}
          score={question.points}
          question={question.title}
          answer={question.answer}
          onQuestionClick={handleQuestionClick}
        />
      );
    });

    return (
      <div key={nextId()} className={styles.columnItems}>
        {generatedBoxes}
      </div>
    );
  };

  const handleQuestionClick = (question: string, answer: string) => {
    setIsModalVisible(true);
    setSelectedQuestion(question);
    setSelectedAnswer(answer);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedQuestion("");
    setSelectedAnswer("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    valueRef.current = event.target.value;
  };
  const updatePlayerPoints = (playerName: string, points: number) => {
    switch (playerName) {
      case player1.name:
        setPlayer1((prevPlayer) => ({ ...prevPlayer, points: prevPlayer.points + points }));
        break;
      case player2.name:
        setPlayer2((prevPlayer) => ({ ...prevPlayer, points: prevPlayer.points + points }));
        break;
      case player3.name:
        setPlayer3((prevPlayer) => ({ ...prevPlayer, points: prevPlayer.points + points }));
        break;
      default:
        break;
    }
    setCurrentPlayer(playerName);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const index = Number(event.key) - 1;
      if (index >= 0 && index < players.length) {
        setActivePlayerIndex(index);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [players.length]);

  const handleSubmit = () => {
    let pointsToAdd: number;
    const inputCopy = cloneDeep(valueRef.current);
    const unformattedAnswer = cloneDeep(selectedAnswer);
    setIsSubmitting(true);
    setTimeout(() => {
      if (inputCopy.toLowerCase() === unformattedAnswer.toLowerCase()) {
        setIsValid("True");
        pointsToAdd = 100;
      } else {
        setIsValid("False");
        pointsToAdd = 0;
      }
      updatePlayerPoints(players[activePlayerIndex].name, pointsToAdd);
      const nextPlayerIndex = (activePlayerIndex + 1) % players.length;
      setActivePlayerIndex(nextPlayerIndex);
      setCurrentPlayer(players[nextPlayerIndex].name);
      setTimeout(() => {
      setIsModalVisible(false);
      setIsValid("");
      setSelectedQuestion("");
      setSelectedAnswer("");
      }, 1000);
    }, 1000);
  };

  return (
    <div className={styles.mainContainer}>
      <p className={styles.paragraph}>Welcome to</p>
      <h1 className={styles.title}>FDIPARDY</h1>
      <h2>Active Player: {players[activePlayerIndex].name}</h2>
      <div className={styles.questionsContainer}>
        {fullCategories.map((category) => generateQuestionBoxColumns(category))}
      </div>
      <div className={styles.playerContainer}>
        <PlayerBox key={"player1"} name={player1.name} score={player1.points} color={"rgb(223, 255, 216)"} />
        <PlayerBox key={"player2"} name={player2.name} score={player2.points} color={"rgb(254, 222, 255)"} />
        <PlayerBox key={"player3"} name={player3.name} score={player3.points} color={"rgb(223, 255, 216)"} />
      </div>
      <div>
        <QuestionModal
          onClose={handleClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isValid={isValid}
          valueRef={valueRef}
          isModalVisible={isModalVisible}
          answer={selectedAnswer}
          question={selectedQuestion}
        />
      </div>
    </div>
  );
};

export default MainContainer;
