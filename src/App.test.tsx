import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component tests', () => {
  test('Header exists.', () => {
    render(<App />);
    const headerElement = screen.getByText(/The Career Helpi/);
    expect(headerElement).toBeInTheDocument();
  });

  test('Page exists.', () => {
    render(<App />);
    const pageElement = screen.getByTestId('page');
    expect(pageElement).toBeInTheDocument();
  });

  test('Footer exists.', () => {
    render(<App />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  test('API Key field exists', () => {
    render(<App />);
    const apiKeyInput = screen.getByPlaceholderText(/Insert API Key Here/i);
    expect(apiKeyInput).toBeInTheDocument();
  });
});