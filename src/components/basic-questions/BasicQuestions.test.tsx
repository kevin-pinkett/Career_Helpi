import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BasicQuestions } from "./BasicQuestions";

jest.mock("../../data/basic-questions.json", () => [
    { id: 0, body: "Question 1?", options: ["Option 1", "Option 2"] },
    { id: 1, body: "Question 2?", options: ["Option A", "Option B"] },
]);

describe("BasicQuestions Component", () => {
    const mockOpenPopup = jest.fn();
    const mockSetPage = jest.fn();
    const mockSetAnswers = jest.fn();
    const mockSetQuestions = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Renders the first question and its options", () => {
        render(
            <BasicQuestions
                openPopup={mockOpenPopup}
                setPage={mockSetPage}
                setAnswers={mockSetAnswers}
                setQuestions={mockSetQuestions}
            />
        );

        expect(screen.getByText("Question 1?")).toBeInTheDocument();
        expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
        expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
    });

    test("Advances to the next question when 'Next' button is clicked", () => {
        render(
            <BasicQuestions
                openPopup={mockOpenPopup}
                setPage={mockSetPage}
                setAnswers={mockSetAnswers}
                setQuestions={mockSetQuestions}
            />
        );

        fireEvent.click(screen.getByText("Next"));

        expect(screen.getByText("Question 2?")).toBeInTheDocument();
        expect(screen.getByLabelText("Option A")).toBeInTheDocument();
        expect(screen.getByLabelText("Option B")).toBeInTheDocument();
    });

    test("Regresses to the previous question when 'Previous' button is clicked", () => {
        render(
            <BasicQuestions
                openPopup={mockOpenPopup}
                setPage={mockSetPage}
                setAnswers={mockSetAnswers}
                setQuestions={mockSetQuestions}
            />
        );

        fireEvent.click(screen.getByText("Next"));
        fireEvent.click(screen.getByText("Previous"));

        expect(screen.getByText("Question 1?")).toBeInTheDocument();
    });

    test("Updates progress when an answer is selected", () => {
        render(
            <BasicQuestions
                openPopup={mockOpenPopup}
                setPage={mockSetPage}
                setAnswers={mockSetAnswers}
                setQuestions={mockSetQuestions}
            />
        );

        fireEvent.click(screen.getByLabelText("Option 1"));

        expect(mockSetAnswers).toHaveBeenCalledWith([0, -1]);
    });

    test("Triggers popup when all questions are answered", () => {
        render(
            <BasicQuestions
                openPopup={mockOpenPopup}
                setPage={mockSetPage}
                setAnswers={mockSetAnswers}
                setQuestions={mockSetQuestions}
            />
        );

        fireEvent.click(screen.getByLabelText("Option 1"));
        fireEvent.click(screen.getByText("Next"));
        fireEvent.click(screen.getByLabelText("Option A"));

        expect(mockOpenPopup).toHaveBeenCalled();
    });

    test("Disables 'Submit' button until all questions are answered", () => {
        render(
            <BasicQuestions
                openPopup={mockOpenPopup}
                setPage={mockSetPage}
                setAnswers={mockSetAnswers}
                setQuestions={mockSetQuestions}
            />
        );

        const submitButton = screen.getByText("Submit");
        expect(submitButton).toBeDisabled();

        fireEvent.click(screen.getByLabelText("Option 1"));
        fireEvent.click(screen.getByText("Next"));
        fireEvent.click(screen.getByLabelText("Option A"));

        expect(submitButton).not.toBeDisabled();
    });

    test("Calls setQuestions with the correct question bodies on mount", () => {
        render(
            <BasicQuestions
                openPopup={mockOpenPopup}
                setPage={mockSetPage}
                setAnswers={mockSetAnswers}
                setQuestions={mockSetQuestions}
            />
        );

        expect(mockSetQuestions).toHaveBeenCalledWith(["Question 1?", "Question 2?"]);
    });
});