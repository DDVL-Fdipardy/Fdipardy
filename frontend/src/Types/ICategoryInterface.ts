import { IQuestionInterface } from "./IQuestionInterface";

export interface ICategoryInterface {
  categoryName: string;
  questions: IQuestionInterface[];
}
