import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBar } from './progressBar';

describe('ProgressBar Component', () => {
    it('renders the progress bar with the correct progress percentage', () => {
        render(<ProgressBar progress={50} setProgress={() => {}} />);
        const progressLabel = screen.getByText('50.00%');
        expect(progressLabel).toBeInTheDocument();
    });

    it('applies the correct color for progress less than 40', () => {
        render(<ProgressBar progress={30} setProgress={() => {}} />);
        const progressBarFill = screen.getByTestId("bar-fill");
        expect(progressBarFill).toHaveStyle('background-color: #ff0000');
    });

    it('applies the correct color for progress between 40 and 70', () => {
        render(<ProgressBar progress={50} setProgress={() => {}} />);
        const progressBarFill = screen.getByTestId("bar-fill");
        expect(progressBarFill).toHaveStyle('background-color: #ffa500');
    });

    it('applies the correct color for progress greater than or equal to 70', () => {
        render(<ProgressBar progress={80} setProgress={() => {}} />);
        const progressBarFill = screen.getByTestId("bar-fill");
        expect(progressBarFill).toHaveStyle('background-color: #2ecc71');
    });

    it('renders the progress bar with the correct width', () => {
        render(<ProgressBar progress={75} setProgress={() => {}} />);
        const progressBarFill = screen.getByTestId("bar-fill");
        expect(progressBarFill).toHaveStyle('width: 75%');
    });
});