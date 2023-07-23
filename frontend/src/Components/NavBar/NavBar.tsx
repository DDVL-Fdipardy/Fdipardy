import styles from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <ul className={styles.nav}>
      <li className={styles.tab}>
        <a href={"/"}>Game</a>
      </li>
      <li className={styles.tab}>
        <a href={"/leaderboard"}>Leaderboard</a>
      </li>
    </ul>
  );
};
