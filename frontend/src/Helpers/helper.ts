import { IAnswer } from "../Types/IAnswer";
import { ICategory, IFullCategory } from "../Types/ICategory";
import { IQuestion, IQuestionWithAnswer } from "../Types/IQuestion";

export const generateFullCategories = (categories: ICategory[], answers: IAnswer[]): IFullCategory[] => {
  if (categories.length === 0 || answers.length === 0) return [];
  const questions: IQuestion[] = [];

  categories.forEach((category) =>
    category.questions.forEach((question) => {
      questions.push(question);
    })
  );

  const extendedQuestions: IQuestionWithAnswer[] = questions.map((question) => {
    const extendedQuestion: IQuestionWithAnswer = { ...question, answer: "" };
    const answer: IAnswer | undefined = answers.find((answer) => answer.id === question.answerId);
    extendedQuestion.answer = answer ? answer.title : "";
    return extendedQuestion;
  });

  const extendedCategories: IFullCategory[] = categories.map((category) => {
    const relevantFullQuestions: IQuestionWithAnswer[] = [];
    extendedQuestions.forEach((fullQuestion) => {
      if (fullQuestion.themaId === category.id) {
        relevantFullQuestions.push(fullQuestion);
      }
    });
    return { id: category.id, title: category.title, questions: relevantFullQuestions };
  });

  return extendedCategories;
};

export const isWhitespaceIncluded = (value: string): boolean => {
  if (value.includes(" ")) return true;
  return false;
};
