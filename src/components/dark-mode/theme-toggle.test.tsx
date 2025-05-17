/**
 * 
 * Co-pilot generated tests, reviewed kevin-pinkett
 * 
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './theme-toggle';
const mockedUseTheme = require('./theme-context').useTheme;

// Mock the useTheme hook
jest.mock('./theme-context', () => ({
    useTheme: jest.fn(),
}));


describe('ThemeToggle', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders with Light Mode label when isDarkMode is false', () => {
        mockedUseTheme.mockReturnValue({
            isDarkMode: false,
            toggleTheme: jest.fn(),
        });

        render(<ThemeToggle />);
        expect(screen.getByLabelText('Light Mode')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders with Dark Mode label when isDarkMode is true', () => {
        mockedUseTheme.mockReturnValue({
            isDarkMode: true,
            toggleTheme: jest.fn(),
        });

        render(<ThemeToggle />);
        expect(screen.getByLabelText('Dark Mode')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('calls toggleTheme when switch is toggled', () => {
        const toggleTheme = jest.fn();
        mockedUseTheme.mockReturnValue({
            isDarkMode: false,
            toggleTheme,
        });

        render(<ThemeToggle />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(toggleTheme).toHaveBeenCalledTimes(1);
    });
});