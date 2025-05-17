/**
 * 
 * Tests Co-pilot Generated, Reviewed by kevin-pinkett
 * 
 */


import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BasicQuestions } from "./BasicQuestions";

// Mock dependencies
jest.mock("../../data/basic-questions.json", () => [
    {
        id: 0,
        body: "What is your favorite color?",
        options: ["Red", "Blue", "Green"]
    },
    {
        id: 1,
        body: "What is your favorite animal?",
        options: ["Dog", "Cat", "Bird"]
    }
]);
jest.mock("../progress-bar/progressBar", () => ({
    ProgressBar: ({ progress }: { progress: number }) => (
        <div data-testid="progress-bar">{progress}</div>
    )
}));

describe("BasicQuestions", () => {
    let openPopup: jest.Mock;
    let setPage: jest.Mock;
    let setAnswers: jest.Mock;
    let setQuestions: jest.Mock;

    beforeEach(() => {
        openPopup = jest.fn();
        setPage = jest.fn();
        setAnswers = jest.fn();
        setQuestions = jest.fn();
    });

    it("renders the first question and options", () => {
        render(
            <BasicQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        expect(screen.getByTestId("basic-page")).toBeInTheDocument();
        expect(screen.getByTestId("question")).toHaveTextContent("What is your favorite color?");
        expect(screen.getByTestId("Option 1")).toHaveTextContent("Red");
        expect(screen.getByTestId("Option 2")).toHaveTextContent("Blue");
        expect(screen.getByTestId("Option 3")).toHaveTextContent("Green");
    });

    it("calls setQuestions with question bodies on mount", () => {
        render(
            <BasicQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        expect(setQuestions).toHaveBeenCalledWith([
            "What is your favorite color?",
            "What is your favorite animal?"
        ]);
    });

    it("selects an answer and updates progress", () => {
        render(
            <BasicQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        fireEvent.click(screen.getByTestId("Option 2")); // Select "Blue"
        expect(setAnswers).toHaveBeenCalledWith(["Blue", ""]);
        expect(screen.getByTestId("progress-bar")).toHaveTextContent("50");
    });

    it("navigates to next and previous questions", () => {
        render(
            <BasicQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        // Go to next question
        fireEvent.click(screen.getByText("Next"));
        expect(screen.getByTestId("question")).toHaveTextContent("What is your favorite animal?");
        // Go back to previous question
        fireEvent.click(screen.getByText("Previous"));
        expect(screen.getByTestId("question")).toHaveTextContent("What is your favorite color?");
    });

    it("clears answers and resets to first question", () => {
        render(
            <BasicQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        // Select an answer and go to next question
        fireEvent.click(screen.getByTestId("Option 1"));
        fireEvent.click(screen.getByText("Next"));
        // Click clear
        fireEvent.click(screen.getByText("Clear"));
        expect(screen.getByTestId("question")).toHaveTextContent("What is your favorite color?");
        // Progress should be reset
        expect(screen.getByTestId("progress-bar")).toHaveTextContent("0");
    });

    it("enables submit button only when all questions are answered", () => {
        render(
            <BasicQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        const submitButton = screen.getByText("Submit") as HTMLButtonElement;
        expect(submitButton).toBeDisabled();
        // Answer all questions
        fireEvent.click(screen.getByTestId("Option 1"));
        fireEvent.click(screen.getByText("Next"));
        fireEvent.click(screen.getByTestId("Option 2"));
        expect(submitButton).not.toBeDisabled();
    });

    it("calls openPopup when all questions are answered", () => {
        render(
            <BasicQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        // Answer all questions
        fireEvent.click(screen.getByTestId("Option 1"));
        fireEvent.click(screen.getByText("Next"));
        fireEvent.click(screen.getByTestId("Option 2"));
        // openPopup should be called automatically
        expect(openPopup).toHaveBeenCalled();
    });

    it("fills answers when 'Kev's Answers' button is clicked", () => {
        render(
            <BasicQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        fireEvent.click(screen.getByText("Kev's Answers"));
        expect(setAnswers).toHaveBeenCalled();
    });
});