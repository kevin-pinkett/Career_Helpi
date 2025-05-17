/**
 * 
 * Co-pilot generated tests, reviewed kevin-pinkett
 * 
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { FAQQuestion } from "./FAQQuestion";
import "@testing-library/jest-dom";


describe("FAQQuestion Component", () => {
    const question = "What is React?";
    const answer = "React is a JavaScript library for building user interfaces.";

    test("Renders the question", () => {
        render(<FAQQuestion question={question} answer={answer} />);
        const questionButton = screen.getByText(question);
        expect(questionButton).toBeInTheDocument();
    });

    test("Does not show the answer initially", () => {
        render(<FAQQuestion question={question} answer={answer} />);
        const answerBox = screen.queryByText(answer);
        expect(answerBox).not.toBeVisible();
    });

    test("Shows the answer when the question is clicked", () => {
        render(<FAQQuestion question={question} answer={answer} />);
        const questionButton = screen.getByText(question);
        fireEvent.click(questionButton);
        const answerText = screen.getByText(answer);
        expect(answerText).toBeVisible();
    });

    test("Hides the answer when the question is clicked again", () => {
        render(<FAQQuestion question={question} answer={answer} />);
        const questionButton = screen.getByText(question);
        fireEvent.click(questionButton); // Open
        fireEvent.click(questionButton); // Close
        const answerText = screen.getByText(answer);
        expect(answerText).not.toBeVisible();
    });
});