import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DetailedQuestions } from "./DetailedQuestions";

// Mock dependencies
jest.mock("../progress-bar/progressBar", () => ({
    ProgressBar: ({ progress }: { progress: number }) => (
        <div data-testid="progress-bar">{progress}</div>
    ),
}));

// Mock data
const mockQuestions = [
    { id: 1, body: "First question?" },
    { id: 2, body: "Second question?" },
    { id: 3, body: "Third question?" },
];

// Mock the imported JSON data
jest.mock("../../data/detailed-questions.json", () => ({
    1: { id: 1, body: "First question?" },
    2: { id: 2, body: "Second question?" },
    3: { id: 3, body: "Third question?" },
}), { virtual: true });

describe("DetailedQuestions", () => {
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

    it("renders the first question and progress bar", () => {
        render(
            <DetailedQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        expect(screen.getByTestId("question")).toHaveTextContent(/first/i);
        expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
        expect(setQuestions).toHaveBeenCalledWith([
            "First question?",
            "Second question?",
            "Third question?",
        ]);
    });

    test("navigates to next and previous questions", () => {
        render(
            <DetailedQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        // Next
        fireEvent.click(screen.getByText("Next"));
        expect(screen.getByTestId("question")).toHaveTextContent(/second/i);

        // Next again
        fireEvent.click(screen.getByText("Next"));
        expect(screen.getByTestId("question")).toHaveTextContent(/third/i);

        // Next at last question should stay at last
        fireEvent.click(screen.getByText("Next"));
        expect(screen.getByTestId("question")).toHaveTextContent(/third/i);

        // Previous
        fireEvent.click(screen.getByText("Previous"));
        expect(screen.getByTestId("question")).toHaveTextContent(/second/i);

        // Previous again
        fireEvent.click(screen.getByText("Previous"));
        expect(screen.getByTestId("question")).toHaveTextContent(/first/i);

        // Previous at first question should stay at first
        fireEvent.click(screen.getByText("Previous"));
        expect(screen.getByTestId("question")).toHaveTextContent(/first/i);
    });

    it("updates answer and progress", () => {
        render(
            <DetailedQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        const textarea = screen.getByPlaceholderText("Type your response here");
        act(() => {
            fireEvent.change(textarea, { target: { value: "My answer" } });
        });
        expect(setAnswers).toHaveBeenCalledWith(expect.arrayContaining(["My answer"]));
        expect(screen.getByTestId("progress-bar")).toHaveTextContent("33.33333333333333");
    });

    it("enables submit button only when all questions are answered", () => {
        render(
            <DetailedQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        const submitButton = screen.getByText("Submit") as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);

        // Answer all questions
        const textarea = screen.getByPlaceholderText("Type your response here");
        fireEvent.change(textarea, { target: { value: "A1" } });
        fireEvent.click(screen.getByText("Next"));
        fireEvent.change(screen.getByPlaceholderText("Type your response here"), { target: { value: "A2" } });
        fireEvent.click(screen.getByText("Next"));
        fireEvent.change(screen.getByPlaceholderText("Type your response here"), { target: { value: "A3" } });

        // All answered, progress should be 100
        expect(screen.getByTestId("progress-bar")).toHaveTextContent("100");
        expect(screen.getByText("Submit")).not.toBeDisabled();
    });

    it("calls openPopup when submit is clicked", () => {
        render(
            <DetailedQuestions
                openPopup={openPopup}
                setPage={setPage}
                setAnswers={setAnswers}
                setQuestions={setQuestions}
            />
        );
        // Answer all questions
        fireEvent.change(screen.getByPlaceholderText("Type your response here"), { target: { value: "A1" } });
        fireEvent.click(screen.getByText("Next"));
        fireEvent.change(screen.getByPlaceholderText("Type your response here"), { target: { value: "A2" } });
        fireEvent.click(screen.getByText("Next"));
        fireEvent.change(screen.getByPlaceholderText("Type your response here"), { target: { value: "A3" } });

        // Submit
        fireEvent.click(screen.getByText("Submit"));
        expect(openPopup).toHaveBeenCalled();
    });
});