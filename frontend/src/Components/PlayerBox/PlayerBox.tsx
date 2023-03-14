import { IPlayerBoxProps } from "./IPlayerBoxProps";
import styles from "./PlayerBox.module.css";

const PlayerBox = (props: IPlayerBoxProps) => {
  const { score, name, color } = props;
  return (
    <div className={styles.playerContainer} style={{ backgroundColor: `${color}` }}>
      <div>{name}</div>
      <div>{score}</div>
    </div>
  );
};

export default PlayerBox;
