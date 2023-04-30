export interface IQuestionModalProps {
  isModalVisible: boolean;
  question: string;
  answer: string;
  activePlayerIndex: number | null;
  activePlayersLength: number;
  onClose(): void;
  addListener: () => void;
  resetActivePlayer: () => void;
}
