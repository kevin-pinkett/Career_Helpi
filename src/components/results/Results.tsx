import ResultsCard from "./ResultCard";

import { useState } from "react";

type Result = {
    title: string;
    description: string;
    traits: string[];
    jobRoles: string[];
    skills: string[];
}


export function ResultsPage() {
    const [results, setResults] = useState<Result[]>([
        {
            title: "Plumber",
            description: "fix plumbing",
            traits: ["reliable", "hands-on", "detail-oriented"],
            jobRoles: ["Pipefitter", "Maintenance Technician", "Journeyman Plumber"],
            skills: ["Welding", "Blueprint Reading", "Soldering"]
        },
        {
            title: "Astronaut",
            description: "space",
            traits: ["brave", "intelligent", "fit"],
            jobRoles: ["Mission Specialist", "Commander", "Flight Engineer"],
            skills: ["Engineering", "Piloting", "Problem Solving"]
        },
        {
            title: "Doctor",
            description: "health",
            traits: ["empathetic", "analytical", "resilient"],
            jobRoles: ["Surgeon", "Pediatrician", "General Practitioner"],
            skills: ["Diagnosis", "Surgery", "Patient Care"]
        }
    ]);


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