import { fireEvent, render, screen } from "@testing-library/react"
import { HomePage } from "./HomePage"

describe("Home Page Component tests", () =>{
    test("Home Page is visible.", () => {
        render(<HomePage setPage={(page) => {}}hasValidKey={true}/>);
        const home = screen.getByTestId("home-page");
        expect(home).toBeInTheDocument();
    });

    test('Navigate to Basic Quiz', () => {
        const mockSetPage = jest.fn();
        render(<HomePage setPage={mockSetPage}hasValidKey={true}/>);
        fireEvent.click(screen.getByRole("button", { name: /Start Basic Quiz/i}));
        expect(mockSetPage).toHaveBeenCalledWith("basicPage")
    })

    test('Navigate to Detailed Quiz', () => {
        const mockSetPage = jest.fn();
        render(<HomePage setPage={mockSetPage}hasValidKey={true}/>);
        fireEvent.click(screen.getByRole("button", { name: /Start Detailed Quiz/i}));
        expect(mockSetPage).toHaveBeenCalledWith("detailedPage")
    })

    test('Navigate to Custom Quiz', () => {
        const mockSetPage = jest.fn();
        render(<HomePage setPage={mockSetPage}hasValidKey={true}/>);
        fireEvent.click(screen.getByRole("button", { name: /Create My Quiz/i}));
        expect(mockSetPage).toHaveBeenCalledWith("aiPage")
    })

    test('Navigation Disabled with no Key', () => {
        render(<HomePage setPage={(page) => {}}hasValidKey={false}/>);
        const navButtons = screen.getAllByRole("button", { name: /quiz/i})
        navButtons.forEach((button) => expect(button).toBeDisabled());
    })
});
