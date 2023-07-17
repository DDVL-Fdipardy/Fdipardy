import styles from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <ul className={styles.nav}>
      <li className={styles.tab}>Game</li>
      <li className={styles.tab}>Leaderboard</li>
    </ul>
  );
};
