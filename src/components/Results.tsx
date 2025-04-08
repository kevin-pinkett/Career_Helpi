import ResultsCard from "./ResultCard";

export function ResultsPage() {

    return (
    <div className="Basic-Questions">
    <h1>Results</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '2%' }}>
    <div style={{ width: '30%' }}><ResultsCard title="Plumber" description="fix plumbing" traits={["test", "test", "test"]} jobRoles={["test", "test", "test"]} skills={["test", "test", "test"]} /></div>
    <div style={{ width: '30%' }}><ResultsCard title="AStronaut" description="space" traits={["test", "test", "test"]} jobRoles={["test", "test", "test"]} skills={["test", "test", "test"]} /></div>
    <div style={{ width: '30%' }}><ResultsCard title="doctor" description="health" traits={["test", "test", "test"]} jobRoles={["test", "test", "test"]} skills={["test", "test", "test"]} /></div>
    </div>
    </div>
)
}

export default ResultsPage;