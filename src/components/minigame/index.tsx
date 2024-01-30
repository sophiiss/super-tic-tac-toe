import { Square } from './square';
import styles from './minigame.module.css';
import { FC, useContext, useState } from 'react';
import type { Coords } from '../game';
import { next_minigame } from '../game';

type FilledSquare = true | false | null;

export type SquaresArray = [
  [FilledSquare, FilledSquare, FilledSquare],
  [FilledSquare, FilledSquare, FilledSquare],
  [FilledSquare, FilledSquare, FilledSquare],
];

type MinigameProps = {
  minigame_coords: Coords;
};

export const Minigame: FC<MinigameProps> = ({ minigame_coords }) => {
  const [current_letter, set_letter] = useState(false);
  const [squares_array, set_squares_array] = useState<SquaresArray>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const { next_minigame_coords, handle_hover, handle_unhover } =
    useContext(next_minigame);

  const handle_square_hover = (square_coords: Coords) => {
    handle_hover(square_coords);
  };

  const handle_square_unhover = () => {
    handle_unhover();
  };

  const handle_click = (coords: Coords) => {
    console.log(squares_array);

    const squares_array_copy = squares_array;
    squares_array_copy[coords[0]][coords[1]] = current_letter;
    set_squares_array(squares_array_copy);
    set_letter((previous) => !previous);
  };

  let key = 0;
  let key_inner = 1000;

  return (
    <div
      className={styles['minigame-grid']}
      data-is_next={
        next_minigame_coords?.toString() === minigame_coords.toString()
          ? 'true'
          : 'false'
      }
    >
      {squares_array.map((outer, outer_index) => {
        key++;
        return (
          <div className={styles['mini-minigame-grid']} key={key}>
            {outer.map((_inner, inner_index) => {
              key_inner++;
              return (
                <Square
                  on_mouse_leave={handle_square_unhover}
                  on_mouse_enter={handle_square_hover}
                  key={key_inner}
                  current_matrix={squares_array}
                  on_click={handle_click}
                  square_coords={[inner_index, outer_index]}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
