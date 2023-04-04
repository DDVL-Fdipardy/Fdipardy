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

const MainContainer = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [fullCategories, setFullCategories] = useState<IFullCategory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const valueRef = useRef<string>("");

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

  const handleSubmit = () => {
    const inputCopy = cloneDeep(inputValue);
    const unformattedAnswer = cloneDeep(selectedAnswer);
    if (inputCopy.toLowerCase() === unformattedAnswer.toLowerCase()) {
      setTimeout(() => setErrorMessage("Correct answer!"), 3000);
      setIsModalVisible(false);
      setSelectedQuestion("");
      setSelectedAnswer("");
    } else {
      setErrorMessage("Wrong answer!");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <p className={styles.paragraph}>Welcome to</p>
      <h1 className={styles.title}>FDIPARDY</h1>
      <div className={styles.questionsContainer}>
        {fullCategories.map((category) => generateQuestionBoxColumns(category))}
      </div>
      <div className={styles.playerContainer}>
        <PlayerBox key={"player1"} name={"Player 1"} score={100} color={"rgb(223, 255, 216)"} />
        <PlayerBox key={"player2"} name={"Player 2"} score={100} color={"rgb(254, 222, 255)"} />
        <PlayerBox key={"player3"} name={"Player 3"} score={100} color={"rgb(223, 255, 216)"} />
      </div>
      <div>
        <QuestionModal
          onClose={handleClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          inputValue={inputValue}
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
