/**
 * 
 * Co-pilot generated tests, reviewed kevin-pinkett
 * 
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";

describe("Header Component", () => {
    const mockSetPage = jest.fn();
    beforeEach(() => {
        mockSetPage.mockClear();
    });

    test("Renders all buttons", () => {
        render(<Header page="homePage" setPage={mockSetPage} disabled={false} />);

        expect(screen.getByText("Home Page")).toBeInTheDocument();
        expect(screen.getByText("Basic Quiz")).toBeInTheDocument();
        expect(screen.getByText("Detailed Quiz")).toBeInTheDocument();
        expect(screen.getByText("FAQ")).toBeInTheDocument();
    });

    test("Disables the correct button based on the current page", () => {
        render(<Header page="homePage" setPage={mockSetPage} disabled={false} />);
        expect(screen.getByText("Home Page")).toBeDisabled();
        expect(screen.getByText("Basic Quiz")).not.toBeDisabled();
        expect(screen.getByText("Detailed Quiz")).not.toBeDisabled();
        expect(screen.getByText("FAQ")).not.toBeDisabled();
    });

    test("Calls setPage with 'homePage' when Home Page button is clicked", () => {
        render(<Header page="basicPage" setPage={mockSetPage} disabled={false} />);
        fireEvent.click(screen.getByText("Home Page"));
        expect(mockSetPage).toHaveBeenCalledWith("homePage");
    });

    test("Calls setPage with 'basicPage' when Basic Quiz button is clicked", () => {
        render(<Header page="homePage" setPage={mockSetPage} disabled={false} />);
        fireEvent.click(screen.getByText("Basic Quiz"));
        expect(mockSetPage).toHaveBeenCalledWith("basicPage");
    });

    test("Calls setPage with 'detailedPage' when Detailed Quiz button is clicked", () => {
        render(<Header page="homePage" setPage={mockSetPage} disabled={false} />);
        fireEvent.click(screen.getByText("Detailed Quiz"));
        expect(mockSetPage).toHaveBeenCalledWith("detailedPage");
    });

    test("Calls setPage with 'faqPage' when FAQ button is clicked", () => {
        render(<Header page="homePage" setPage={mockSetPage} disabled={false} />);
        fireEvent.click(screen.getByText("FAQ"));
        expect(mockSetPage).toHaveBeenCalledWith("faqPage");
    });
});