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
  const [player1, setPlayer1] = useState<Player>({ name: "Player 1", points: 0 });
  const [player2, setPlayer2] = useState<Player>({ name: "Player 2", points: 0 });
  const [player3, setPlayer3] = useState<Player>({ name: "Player 3", points: 0 });
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [playerScores, setPlayerScores] = useState([0, 0, 0]);
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




  const handleQuestionClick = (question: string, answer: string) => {
    setIsModalVisible(true);
    setSelectedQuestion(question);
    setSelectedAnswer(answer);
  };


  function InputTextCounter(){
    const [val, setVal] = useState("")

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
      valueRef.current = event.target.value;

      const data = ev.target.value.split(""); // intervall between words/create one more string 
      console.log(data);
      if (data.length <= 1) {
        setVal(ev.target.value);
      } else {
        <button className={styles.submitButton} onClick={() => handleSubmit()} disabled={true}>Submit</button> && alert('You can only enter one word!!!');
      }
    }
  }
  
  
  
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
    //e.preventDefault();
    let pointsToAdd: number;
    const inputCopy = cloneDeep(valueRef.current);
    const unformattedAnswer = cloneDeep(selectedAnswer);
    setIsSubmitting(true);
    setTimeout(() => {
      if (inputCopy.toLowerCase() === unformattedAnswer.toLowerCase()) {
        setIsValid("True");
        pointsToAdd = 100;
      } else {
        pointsToAdd = 0;
        setIsValid("False");
      }
      updatePlayerPoints(players[activePlayerIndex].name, pointsToAdd);
      setActivePlayerIndex((activePlayerIndex + 1) % players.length);
      setTimeout(() => {
        setIsModalVisible(false);
        setIsValid("");
        setSelectedQuestion("");
        setSelectedAnswer("");
        setCurrentPlayer((prevPlayer) => {
          switch (prevPlayer) {
            case player1.name:
              return player2.name;
            case player2.name:
              return player3.name;
            case player3.name:
              return player1.name;
            default:
              return player1.name;
          }
        });
      }, 2000);
      setIsSubmitting(false);
    }, 1000);
  };

  function generateQuestionBoxColumns(category: IFullCategory): any {
    throw new Error("Function not implemented.");
  }

  function handleClose(): void {
    throw new Error("Function not implemented.");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

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
