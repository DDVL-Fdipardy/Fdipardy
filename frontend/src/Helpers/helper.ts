import { IAnswer } from "../Types/IAnswer";
import { ICategory, IFullCategory } from "../Types/ICategory";
import { IQuestion, IQuestionWithAnswer } from "../Types/IQuestion";

export const generateFullCategories = (categories: ICategory[], answers: IAnswer[]): IFullCategory[] => {
  const questions: IQuestion[] = [];
  const extendedQuestions: IQuestionWithAnswer[] = [];
  const extendedCategories: IFullCategory[] = [];

  categories.map((category) =>
    category.questions.map((question) => {
      questions.push(question);
    })
  );

  questions.map((question) => {
    answers.map((answer) => {
      if (answer.id === question.answerId) {
        const extendedQuestion: IQuestionWithAnswer = { ...question, answer: answer.title };
        extendedQuestions.push(extendedQuestion);
      }
    });
  });

  categories.map((category) => {
    const extendedCategory: IFullCategory = { id: category.id, title: category.title, questions: [] };
    extendedQuestions.map((extendedQuestion) => {
      if (extendedQuestion.themaId === category.id) {
        extendedCategory.questions.push(extendedQuestion);
      }
    });
    extendedCategories.push(extendedCategory);
  });

  return extendedCategories;
};
