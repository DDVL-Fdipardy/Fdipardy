export interface IQuestionBoxProps {
  score: number;
  question: string;
  answer: string;
  onQuestionClick(question: string, answer: string): void;
}
