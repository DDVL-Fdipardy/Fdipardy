import { IQuestion } from "./IQuestion";

export interface ICategory {
  id: number;
  title: string;
  questions: IQuestion[];
}
