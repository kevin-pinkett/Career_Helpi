import { BasicQuestionsOption } from "./BasicQOption";
import { DetailedQuestionsOption } from "./DetailedQOption";
import { FAQOption } from "./FAQOption";
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
            <div className="subtitle">Detailed Questions
                <Row>
                    <DetailedQuestionsOption page={"detailedQuestion"} setPage={setPage} />
                </Row>
            </div>
        </div>
        <div id="faq-box" className="Page-Box">
            <div className="subtitle">FAQ Questions
                <Row>
                    <FAQOption page={"faqPage"} setPage={setPage} />
                </Row>
            </div>
        </div>
        
    </div>

    
    </div>
)
}