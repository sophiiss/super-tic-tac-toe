import { FC, HTMLProps, useState } from 'react';
import styles from './square.module.css';
import type { SquaresArray } from '.';
import type { Coords } from '../game';

type SquareProps = HTMLProps<HTMLButtonElement> & {
  on_click: (coords: Coords) => void;
  square_coords: Coords;
  current_matrix: SquaresArray;
  on_mouse_enter: (coords: Coords) => void;
  on_mouse_leave: () => void;
};

export const Square: FC<SquareProps> = ({
  on_click,
  square_coords,
  current_matrix,
  on_mouse_enter,
  on_mouse_leave,
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

  const handle_hover = () => {
    on_mouse_enter(square_coords);
  };

  const handle_unhover = () => {
    on_mouse_leave();
  };

  return (
    <button
      className={styles.square}
      onMouseLeave={() => handle_unhover()}
      onMouseEnter={() => handle_hover()}
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
