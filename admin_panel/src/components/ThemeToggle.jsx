import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { BsMoon, BsSun } from 'react-icons/bs';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <BsSun /> : <BsMoon />}
    </button>
  );
}
