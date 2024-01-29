import { FC, HTMLProps, useState } from 'react';
import styles from './square.module.css';
import type { Coords, SquaresArray } from '.';

type SquareProps = HTMLProps<HTMLButtonElement> & {
  on_click: (coords: Coords) => void;
  square_coords: Coords;
  current_matrix: SquaresArray;
};

export const Square: FC<SquareProps> = ({
  on_click,
  square_coords,
  current_matrix,
}) => {
  const [is_clicked, set_clicked] = useState(false);

  const current_letter = () => {
    return current_matrix[square_coords[0]][square_coords[1]];
  };

  const handle_click = () => {
    if (is_clicked) return;

    set_clicked(true);
    on_click(square_coords);
  };

  return (
    <button
      className={styles.square}
      onClick={
        is_clicked
          ? () => {}
          : () => {
              handle_click();
            }
      }
    >
      {is_clicked ? (current_letter() ? 'O' : 'X') : ''}
    </button>
  );
};
