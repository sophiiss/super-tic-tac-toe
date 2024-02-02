import { createContext, useState } from 'react';
import { Minigame } from '../minigame';
import styles from './game.module.css';

type Minigame = {
  next: boolean;
  finished: boolean;
  winner?: boolean;
};

export type MinigamesArray = [
  [Minigame, Minigame, Minigame],
  [Minigame, Minigame, Minigame],
  [Minigame, Minigame, Minigame],
];

type MinigameContext = {
  next_minigame_coords: Coords | null;
  handle_hover: (next_coords: Coords) => void;
  handle_unhover: () => void;
};

export type Coords = [number, number];
type NextCoords = Coords | null;

const handle_hover = () => {};
const handle_unhover = () => {};

export const next_minigame = createContext<MinigameContext>({
  next_minigame_coords: null,
  handle_hover,
  handle_unhover,
});

const base_minigame: Minigame = {
  next: false,
  finished: false,
  winner: false,
};

export const Game = () => {
  const [minigames_array, _set_minigames_array] = useState<MinigamesArray>([
    [{ ...base_minigame }, { ...base_minigame }, { ...base_minigame }],
    [{ ...base_minigame }, { ...base_minigame }, { ...base_minigame }],
    [{ ...base_minigame }, { ...base_minigame }, { ...base_minigame }],
  ]);

  const [current_minigame_coords, set_minigame_coords] =
    useState<NextCoords>(null);

  const handle_hover = (next_coords: Coords) => {
    set_minigame_coords(next_coords);
  };

  const handle_unhover = () => {
    set_minigame_coords(null);
  };

  let key = 0;
  let key_inner = 1000;

  return (
    <next_minigame.Provider
      value={{
        next_minigame_coords: current_minigame_coords,
        handle_hover,
        handle_unhover,
      }}
    >
      <div className={styles['game-grid']}>
        {minigames_array.map((outer, outer_index) => {
          key++;
          return (
            <div className={styles['inner-game-grid']} key={key}>
              {outer.map((_inner, inner_index) => {
                key_inner++;
                return (
                  <Minigame
                    key={key_inner}
                    minigame_coords={[inner_index, outer_index]}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </next_minigame.Provider>
  );
};
