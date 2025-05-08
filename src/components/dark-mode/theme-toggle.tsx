import React from 'react';
import { Form } from 'react-bootstrap';
import { useTheme } from './theme-context';
import './theme-toggle.css';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <Form.Check
        type="switch"
        id="theme-switch"
        label={isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        checked={isDarkMode}
        onChange={toggleTheme}
        className="theme-switch"
      />
    </div>
  );
};