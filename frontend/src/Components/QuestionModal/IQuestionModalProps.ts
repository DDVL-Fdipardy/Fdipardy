export interface IQuestionModalProps {
  isModalVisible: boolean;
  question: string;
  answer: string;
  activePlayerIndex: number | null;
  activePlayersLength: number;
  onClose(isFromFalse: boolean): void;
  addListener: () => void;
  resetActivePlayer: () => void;
}
