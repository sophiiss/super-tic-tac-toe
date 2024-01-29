import { Square } from './square';
import styles from './minigame.module.css';
import { useState } from 'react';

export type Coords = [number, number];
type FilledSquare = true | false | null;

export type SquaresArray = [
  [FilledSquare, FilledSquare, FilledSquare],
  [FilledSquare, FilledSquare, FilledSquare],
  [FilledSquare, FilledSquare, FilledSquare],
];

export const Minigame = () => {
  const [current_letter, set_letter] = useState(false);
  const [squares_array, set_squares_array] = useState<SquaresArray>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

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
    <div className={styles['minigame-grid']}>
      {squares_array.map((outer, outer_index) => {
        key++;
        return (
          <div className={styles['mini-minigame-grid']} key={key}>
            {outer.map((_inner, inner_index) => {
              key_inner++;
              return (
                <Square
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
