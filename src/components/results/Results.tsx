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
    answers: number[] | string[];
    questions: string[];

}

function parsePrompt(answers: number[] | string[], questions: string[]): string {
    return questions
        .map((question, index) => `Q: ${question}\nA: ${answers[index+1]}\n\n`)
        .join("");

}

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