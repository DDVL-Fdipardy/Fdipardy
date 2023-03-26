export interface IQuestion {
  answerId: number;
  id: number;
  points: number;
  themaId: number;
  title: string;
}

export interface IQuestionWithAnswer extends IQuestion {
  answer: string;
}
