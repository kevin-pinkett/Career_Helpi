import ResultsCard from "./Results";




export function FAQPage() {

    return (
    <div className="FAQ">
    <h1>FAQ Page</h1>
    




    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '2%' }}>
    <div style={{ width: '30%' }}><ResultsCard></ResultsCard></div>
    <div style={{ width: '30%' }}><ResultsCard></ResultsCard></div>
    <div style={{ width: '30%' }}><ResultsCard></ResultsCard></div>
    </div>






    </div>
)
}