import { Minigame } from '../minigame';
import styles from './game.module.css';

export const Game = () => {
  return (
    <div className={styles.game}>
      <Minigame />
      <Minigame />
      <Minigame />

      <Minigame />
      <Minigame />
      <Minigame />

      <Minigame />
      <Minigame />
      <Minigame />
    </div>
  );
};
