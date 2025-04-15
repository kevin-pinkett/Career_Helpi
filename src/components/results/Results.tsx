import ResultsCard from "./ResultCard";

import { useEffect, useState } from "react";
// import { getGPTResponse } from "../../GPTIntegration";


type Result = {
    title: string;
    description: string;
    traits: string[];
    jobRoles: string[];
    skills: string[];
}

interface ResultsPageProps{
    answers: number[];
}

function parseAnswers(answers: number[]) { 

}

export function ResultsPage({ answers }: ResultsPageProps) {
    const [results, setResults] = useState<Result[]>([
        {
            title: "Plumber",
            description: "fix plumbing",
            traits: ["test"],
            jobRoles: ["test"],
            skills: ["test"]
        },
        {
            title: "Astronaut",
            description: "space",
            traits: ["test"],
            jobRoles: ["test"],
            skills: ["test"]
        },
        {
            title: "Doctor",
            description: "health",
            traits: ["test"],
            jobRoles: ["test"],
            skills: ["test"]
        }
    ]);

    useEffect(() => {
        parseAnswers(answers);
      }, []);



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