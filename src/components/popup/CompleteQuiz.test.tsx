/**
 * 
 * Co-pilot generated tests, reviewed kevin-pinkett
 * 
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { CompletedQuiz } from "./CompleteQuiz";

describe("CompletedQuiz Component", () => {
    const mockClosePopup = jest.fn();
    const mockSetPage = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Renders popup when isPopupOpen is true", () => {
        render(
            <CompletedQuiz
                isPopupOpen={true}
                closePopup={mockClosePopup}
                setPage={mockSetPage}
            />
        );

        expect(screen.getByText("You have answered all questions!")).toBeInTheDocument();
        expect(screen.getByText("Continue Working")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    test("Does not render popup when isPopupOpen is false", () => {
        render(
            <CompletedQuiz
                isPopupOpen={false}
                closePopup={mockClosePopup}
                setPage={mockSetPage}
            />
        );

        expect(screen.queryByText("You have answered all questions!")).not.toBeInTheDocument();
    });

    test("Calls closePopup with false when 'Continue Working' button is clicked", () => {
        render(
            <CompletedQuiz
                isPopupOpen={true}
                closePopup={mockClosePopup}
                setPage={mockSetPage}
            />
        );

        fireEvent.click(screen.getByText("Continue Working"));
        expect(mockClosePopup).toHaveBeenCalledWith(false);
    });

    test("Calls closePopup and setPage when 'Submit' button is clicked", () => {
        render(
            <CompletedQuiz
                isPopupOpen={true}
                closePopup={mockClosePopup}
                setPage={mockSetPage}
            />
        );

        fireEvent.click(screen.getByText("Submit"));
        expect(mockClosePopup).toHaveBeenCalledWith(false);
        expect(mockSetPage).toHaveBeenCalledWith("resultsPage");
    });
});