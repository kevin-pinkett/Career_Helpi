import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ResultsPage } from "./Results";
import * as GPTIntegration from "../../GPTIntegration";

// Mock the ResultsCard component
jest.mock("./ResultCard", () => (props: any) => (
    <div data-testid="result-card">
        <div>{props.title}</div>
        <div>{props.description}</div>
    </div>
));

// Mock getGPTResponse
const mockResults = [
    {
        title: "Software Engineer",
        description: "Develops software applications.",
        traits: ["Analytical", "Detail-oriented"],
        jobRoles: ["Frontend Developer", "Backend Developer"],
        skills: ["JavaScript", "React"],
        link: "https://example.com/software-engineer"
    },
    {
        title: "Data Scientist",
        description: "Analyzes data to gain insights.",
        traits: ["Curious", "Statistical"],
        jobRoles: ["ML Engineer", "Data Analyst"],
        skills: ["Python", "Machine Learning"],
        link: "https://example.com/data-scientist"
    }
];

describe("ResultsPage", () => {
    beforeEach(() => {
        jest.spyOn(GPTIntegration, "getGPTResponse").mockImplementation(() =>
            Promise.resolve(mockResults)
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading screen initially", async () => {
        render(<ResultsPage answers={[1, 2]} questions={["Q1", "Q2"]} />);
        expect(screen.getByText(/Ozzie is deciding what careers are right for you/i)).toBeInTheDocument();
        // Wait for loading to finish
        await waitFor(() => expect(screen.queryByText(/Ozzie is deciding/i)).not.toBeInTheDocument());
    });

    it("renders results after loading", async () => {
        render(<ResultsPage answers={[1, 2]} questions={["Q1", "Q2"]} />);
        await waitFor(() => {
            expect(screen.getAllByTestId("result-card")).toHaveLength(mockResults.length);
        });
        expect(screen.getByText("Software Engineer")).toBeInTheDocument();
        expect(screen.getByText("Data Scientist")).toBeInTheDocument();
    });

    it("calls getGPTResponse with correct prompt", async () => {
        const spy = jest.spyOn(GPTIntegration, "getGPTResponse");
        const answers = [1, 2];
        const questions = ["What do you like?", "What are your strengths?"];
        render(<ResultsPage answers={answers} questions={questions} />);
        await waitFor(() => expect(spy).toHaveBeenCalled());
        // The prompt should match the parsePrompt logic
        const expectedPrompt =
            "Q: What do you like?\nA: 2\n\nQ: What are your strengths?\nA: undefined\n\n";
        expect(spy).toHaveBeenCalledWith(expectedPrompt);
    });

    it("handles API errors gracefully", async () => {
        jest.spyOn(GPTIntegration, "getGPTResponse").mockImplementationOnce(() =>
            Promise.reject(new Error("API Error"))
        );
        render(<ResultsPage answers={[1, 2]} questions={["Q1", "Q2"]} />);
        await waitFor(() => {
            // Should not render any result cards
            expect(screen.queryByTestId("result-card")).not.toBeInTheDocument();
        });
    });
});