import './style/App.css';
import { Game } from './components/game';
import { createContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export type ThemeContext = {
  class_name: Theme;
  toggle_theme: () => void;
};

export const App = () => {
  const theme_context = createContext<ThemeContext>({
    class_name: 'dark',
    toggle_theme,
  });
  const [class_name, set_class_name] = useState<Theme>('dark');

  function set_theme(new_theme: Theme) {
    localStorage.setItem('theme', new_theme);
    set_class_name(new_theme);
    document.body.style.backgroundColor =
      new_theme === 'dark' ? 'rgb(15 21 19)' : 'rgb(245 251 247)';
  }

  const prefers_light_theme = window.matchMedia(
    '(prefers-color-scheme: light)',
  );

  function get_theme() {
    const current_theme = localStorage.getItem('theme') as Theme;
    if (current_theme) {
      set_theme(current_theme);
      return;
    }
    if (prefers_light_theme.matches) {
      set_theme('light');
      return;
    }
    set_theme('dark');
  }

  function toggle_theme() {
    set_theme(class_name === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    get_theme();
  }, []);

  return (
    <theme_context.Provider value={{ class_name, toggle_theme }}>
      <div className={class_name}>
        <h1>Jogo da Velha 4D</h1>
        <button onClick={toggle_theme}>Mudar</button>
        <Game />
      </div>
    </theme_context.Provider>
  );
};
