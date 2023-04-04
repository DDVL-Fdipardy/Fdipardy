export interface IQuestionModalProps {
  isModalVisible: boolean;
  question: string;
  answer: string;
  inputValue: string;
  valueRef: any;
  onClose(): void;
  handleSubmit: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
