import ResultsCard from "./ResultCard";

import { useEffect, useState } from "react";
import { getGPTResponse } from "../../GPTIntegration";
import "./Results.css"


type Result = {
    title: string;
    description: string;
    traits: string[];
    jobRoles: string[];
    skills: string[];
    link: string;
}

interface ResultsPageProps{
    answers: number[] | string[];
    questions: string[];

}

function parsePrompt(answers: number[] | string[], questions: string[]): string {
    return questions
        .map((question, index) => `Q: ${question}\nA: ${answers[index+1]}\n\n`)
        .join("");

}

/**
 * The results page component based on the provided answers and questions.
 * It fetches AI-generated results asynchronously and displays through the Result Card.
 *
 * @param {ResultsPageProps} props - The props for the ResultsPage component.
 * @param {Answer[]} props.answers - The user's answers used to generate the results.
 * @param {Question[]} props.questions - The questions corresponding to the user's answers.
 *
 * @returns {JSX.Element} The rendered ResultsPage component.
 *
 * @remarks
 * - The component initializes with a default set of empty results.
 * - It uses the `useEffect` hook to fetch AI-generated results when the `answers` or `questions` change.
 * - Every individual result is displayed in a `ResultsCard` component.
 *
 */

export function ResultsPage({ answers, questions}: ResultsPageProps) {
    const [results, setResults] = useState<Result[]>([ {
        title: "",
        description: "",
        traits: [""],
        jobRoles: [""],
        skills: [""],
        link: ""
    },
    {
        title: "",
        description: "",
        traits: [""],
        jobRoles: [""],
        skills: [""],
        link: ""
    },
    {
        title: "",
        description: "",
        traits: [""],
        jobRoles: [""],
        skills: [""],
        link: ""
    }
]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const aiResponse = await getGPTResponse(parsePrompt(answers, questions));
                setResults(aiResponse);
            } catch (error) {
                console.error("Ai Error:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchResults(); // Call the async function
    }, [answers, questions]);



    return (
    <div className="Results-Page">
    <h1>Results</h1>
    {loading ? (
     
            <div className="spinner"> <img src="/assets/Spinner@1x-1.0s-255px-255px.svg" alt="Loading spinner"></img></div>
            
    ) : (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '2%' }}>
        {results.map((result, index) => (
            <div key={index} style={{width: '30%' }}>
                <ResultsCard
                    title={result.title}
                    description={result.description}
                    traits={result.traits}
                    jobRoles={result.jobRoles}
                    skills={result.skills}
                    link={result.link}
                />
            </div>
        ))}
    </div>
    )}
    </div>
    );

}

export default ResultsPage;