import { IQuestion, IQuestionWithAnswer } from "./IQuestion";

export interface ICategory {
  id: number;
  title: string;
  questions: IQuestion[];
}

export interface IFullCategory extends Omit<ICategory, "questions"> {
  questions: IQuestionWithAnswer[];
}
