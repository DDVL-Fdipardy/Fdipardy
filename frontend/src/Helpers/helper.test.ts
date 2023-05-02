import { ICategory } from "../Types/ICategory";
import { IQuestion, IQuestionWithAnswer } from "../Types/IQuestion";
import { IAnswer } from "../Types/IAnswer";
import { generateFullCategories } from "./helper";

describe("generateFullCategories", () => {
  const mockQuestions: IQuestion[] = [
    {
      answerId: 1,
      id: 1,
      points: 100,
      themaId: 1,
      title: "Question 1",
    },
    {
      answerId: 2,
      id: 2,
      points: 300,
      themaId: 1,
      title: "Question 2",
    },
  ];
  const mockCategory: ICategory = {
    id: 1,
    title: "Mock Category",
    questions: mockQuestions,
  };
  const mockAnswers: IAnswer[] = [
    {
      id: 1,
      title: "Answer 1",
    },
    {
      id: 2,
      title: "Answer 2",
    },
  ];
  const mockQuestionsWithAnswers: IQuestionWithAnswer[] = [
    {
      answerId: 1,
      id: 1,
      points: 100,
      themaId: 1,
      title: "Question 1",
      answer: "Answer 1",
    },
    {
      answerId: 2,
      id: 2,
      points: 300,
      themaId: 1,
      title: "Question 2",
      answer: "Answer 2",
    },
  ];

  it("Returns the correct length", () => {
    const funcResult = generateFullCategories([mockCategory], mockAnswers);
    expect(funcResult).toHaveLength(1);
  });

  it("Returns the correct type", () => {
    const funcResult = generateFullCategories([mockCategory], mockAnswers);
    expect(funcResult[0]).toHaveProperty("questions", mockQuestionsWithAnswers);
  });

  it("Returns an empty array if category array is empty", () => {
    const funcResult = generateFullCategories([], mockAnswers);
    expect(funcResult).toHaveLength(0);
  });

  it("Returns an empty array if answer array is empty", () => {
    const funcResult = generateFullCategories([mockCategory], []);
    expect(funcResult).toHaveLength(0);
  });
});
