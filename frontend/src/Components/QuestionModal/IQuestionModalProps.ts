export interface IQuestionModalProps {
  isModalVisible: boolean;
  question: string;
  answer: string;
  valueRef: any;
  isValid: string;
  isSubmitting: boolean;
  activePlayerIndex: number;
  players: any;
  onClose(): void;
  handleSubmit: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
