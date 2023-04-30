export interface IQuestionModalProps {
  isModalVisible: boolean;
  question: string;
  answer: string;
  isPlayerAnswerValid: string;
  onClose(): void;
  handleSubmit: (playerAnswer: string) => void;
}
