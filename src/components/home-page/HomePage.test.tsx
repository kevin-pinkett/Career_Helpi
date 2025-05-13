import { fireEvent, render, screen, within } from "@testing-library/react"
import { HomePage } from "./HomePage"

describe("Home Page Component tests", () =>{
    test("Home Page is visible.", () => {
        render(<HomePage setPage={(page) => {}}hasValidKey={true}/>);
        const home = screen.getByTestId("home-page");
        expect(home).toBeInTheDocument();
    });

    test("BasicQuestionsOption component is rendered.", () => {
        render(<HomePage setPage={(page) => {}}hasValidKey={true}/>);
        const basicOption = screen.getByTestId("basic-option");
        expect(basicOption).toBeInTheDocument();
    });

    test("DetailedQuestionsOption component is rendered.", () => {
        render(<HomePage setPage={(page) => {}}hasValidKey={true}/>);
        const detailedOption = screen.getByTestId("detailed-option");
        expect(detailedOption).toBeInTheDocument();
    });

    test("FAQOption component is rendered.", () => {
        render(<HomePage setPage={(page) => {}}hasValidKey={true}/>);
        const faqOption = screen.getByTestId("faq-option");
        expect(faqOption).toBeInTheDocument();
    });

    test("Clicking BasicQuestionsOption button calls setPage with 'basic-questions'.", () => {
        const mockSetPage = jest.fn();
        render(<HomePage setPage={mockSetPage}hasValidKey={true} />);
        const basicOption = screen.getByTestId("basic-option");
        const basicOptionButton = within(basicOption).getByRole("button");
        fireEvent.click(basicOptionButton);
        expect(mockSetPage).toHaveBeenCalledWith("basicPage");
    });

    test("Clicking DetailedQuestionsOption button calls setPage with 'detailed-questions'.", () => {
        const mockSetPage = jest.fn();
        render(<HomePage setPage={mockSetPage}hasValidKey={true} />);
        const detailedOption = screen.getByTestId("detailed-option");
        const detailedOptionButton = within(detailedOption).getByRole("button");
        fireEvent.click(detailedOptionButton);
        expect(mockSetPage).toHaveBeenCalledWith("detailedPage");
    });

    test("Clicking FAQOption button calls setPage with 'faq'.", async () => {
        const mockSetPage = jest.fn();
        render(<HomePage setPage={mockSetPage}hasValidKey={true} />);
        const faqOption = screen.getByTestId("faq-option");
        const faqOptionButton = within(faqOption).getByRole("button");
        fireEvent.click(faqOptionButton);
        expect(mockSetPage).toHaveBeenCalledWith("faqPage");
    });
});
