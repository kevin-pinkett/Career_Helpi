import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BasicQuestions } from "./BasicQuestions";
import { Basic_Question } from "../../interfaces/basic-question";

jest.mock("../../data/basic-questions.json", () => [
    { id: 0, body: "Question 1?", options: ["Option 1", "Option 2"] },
    { id: 1, body: "Question 2?", options: ["Option A", "Option B"] },
]);

describe("BasicQuestions Component", () => {
    const mockOpenPopup = jest.fn();
    const mockSetPage = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Renders the first question and its options", () => {
        render(<BasicQuestions openPopup={mockOpenPopup} setPage={mockSetPage} />);

        expect(screen.getByText("Question 1?")).toBeInTheDocument();
        expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
        expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
    });

    test("advances to the next question when 'Next' button is clicked", () => {
        render(<BasicQuestions openPopup={mockOpenPopup} setPage={mockSetPage} />);

        fireEvent.click(screen.getByText("Next"));

        expect(screen.getByText("Question 2?")).toBeInTheDocument();
        expect(screen.getByLabelText("Option A")).toBeInTheDocument();
        expect(screen.getByLabelText("Option B")).toBeInTheDocument();
    });

    test("regresses to the previous question when 'Previous' button is clicked", () => {
        render(<BasicQuestions openPopup={mockOpenPopup} setPage={mockSetPage} />);

        fireEvent.click(screen.getByText("Next"));
        fireEvent.click(screen.getByText("Previous"));

        expect(screen.getByText("Question 1?")).toBeInTheDocument();
    });

    test("updates progress when an answer is selected", () => {
        render(<BasicQuestions openPopup={mockOpenPopup} setPage={mockSetPage} />);

        fireEvent.click(screen.getByLabelText("Option 1"));

        expect(screen.getByText("50.00%")).toBeInTheDocument();
    });

    test("triggers popup when all questions are answered", () => {
        render(<BasicQuestions openPopup={mockOpenPopup} setPage={mockSetPage} />);

        fireEvent.click(screen.getByLabelText("Option 1"));
        fireEvent.click(screen.getByText("Next"));
        fireEvent.click(screen.getByLabelText("Option A"));

        expect(mockOpenPopup).toHaveBeenCalled();
    });

    test("disables 'Submit' button until all questions are answered", () => {
        render(<BasicQuestions openPopup={mockOpenPopup} setPage={mockSetPage} />);

        const submitButton = screen.getByText("Submit");
        expect(submitButton).toBeDisabled();

        fireEvent.click(screen.getByLabelText("Option 1"));
        fireEvent.click(screen.getByText("Next"));
        fireEvent.click(screen.getByLabelText("Option A"));

        expect(submitButton).not.toBeDisabled();
    });
});