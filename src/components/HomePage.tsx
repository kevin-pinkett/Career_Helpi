import './HomePage.css';
export function HomePage() {

    return (
    <div className="Home-page">
    
    <h1 style={{justifySelf: 'center'}}>Home Page</h1>

    <div className='Box-Container'>
        <div id="basic-questions-box" className="Page-Box">
            <div className="subtitle">Basic Questions</div>
        </div>
        <div id="detailed-questions-box" className="Page-Box">
            <div className="subtitle">Detailed Questions</div>
        </div>
        <div id="faq-box" className="Page-Box">
            <div className="subtitle">FAQ Questions</div>
        </div>
        
    </div>

    </div>
)
}