import ResultsCard from "./ResultCard";

import { useEffect, useState } from "react";
import { getGPTResponse } from "../../GPTIntegration";


type Result = {
    title: string;
    description: string;
    traits: string[];
    jobRoles: string[];
    skills: string[];
}

interface ResultsPageProps{
    answers: number[];
    questions: string[];

}

function parsePrompt(answers: number[], questions: string[]): string {
    return questions
        .map((question, index) => `Q: ${question}\nA: ${answers[index+1]}\n\n`)
        .join("");

}

/**
 * Component representing the Results Page.
 * 
 * This component fetches and displays results based on the provided answers and questions.
 * It uses GPT to generate results dynamically and renders them as a collection of `ResultsCard` components.
 * 
 * @param {ResultsPageProps} props - The props for the ResultsPage component.
 * @param {string[]} props.answers - The user's answers used to generate results.
 * @param {string[]} props.questions - The questions corresponding to the user's answers.
 * 
 * @returns {JSX.Element} The rendered Results Page component.
 * 
 * @remarks
 * - The `results` state is initialized with placeholder data and updated with GPT-generated results.
 * - The `useEffect` hook triggers the fetching of results whenever `answers` or `questions` change.
 * - Each result is displayed in a `ResultsCard` component, styled with a responsive layout.
 * 
 * @example
 * ```tsx
 * <ResultsPage answers={["Answer1", "Answer2"]} questions={["Question1", "Question2"]} />
 * ```
 */
export function ResultsPage({ answers, questions}: ResultsPageProps) {
    const [results, setResults] = useState<Result[]>([
        {
            title: "",
            description: "",
            traits: [""],
            jobRoles: [""],
            skills: [""]
        },
        {
            title: "",
            description: "",
            traits: [""],
            jobRoles: [""],
            skills: [""]
        },
        {
            title: "",
            description: "",
            traits: [""],
            jobRoles: [""],
            skills: [""]
        }
    ]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const aiResponse = await getGPTResponse(parsePrompt(answers, questions));
                setResults(aiResponse);
            } catch (error) {
                console.error("Ai Error:", error);
            }
        };
    
        fetchResults(); // Call the async function
    }, [answers, questions]);



    return (
    <div className="Results-Page">
    <h1>Results</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '2%' }}>
        {results.map((result, index) => (
            <div key={index} style={{width: '30%' }}>
                <ResultsCard
                    title={result.title}
                    description={result.description}
                    traits={result.traits}
                    jobRoles={result.jobRoles}
                    skills={result.skills}
                />
            </div>
        ))}
    </div>
    </div>
    )

}

export default ResultsPage;