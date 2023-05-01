export interface IQuestionBoxProps {
  score: number;
  question: string;
  answer: string;
  onPointsDistribution: (playerIdx: number | null, points: number) => void;
}
