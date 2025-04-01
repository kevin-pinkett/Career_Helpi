import { BasicQuestionsOption } from "./BasicQOption";
import {Row} from "react-bootstrap"
import "./HomePage.css";

interface HomePageProp {
    setPage: (page: string) => void;
}

export function HomePage({setPage}: HomePageProp) {
    return (
    <div className="Home-page">
    
    <h1>Home Page</h1>

    <div className='Box-Container'>
        <div id="basic-questions-box" className="Page-Box">
            <div className="subtitle">
                Basic Questions
                <Row>
                    <BasicQuestionsOption page={"basicQuestion"} setPage={setPage} />
                </Row>
            </div>
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