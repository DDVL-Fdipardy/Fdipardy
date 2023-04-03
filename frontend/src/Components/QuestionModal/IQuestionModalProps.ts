export interface IQuestionModalProps {
  isModalVisible: boolean;
  question: string;
  answer: string;
  inputValue: string;
  onClose(): void;
  handleSubmit: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
