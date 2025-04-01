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
                Basic Quiz
                <Row>
                    <BasicQuestionsOption page={"basicQuestion"} setPage={setPage} />
                </Row>
            </div>
        </div>
        <div id="detailed-questions-box" className="Page-Box">
            <div className="subtitle">Detailed Quiz
                <Row>
                    <DetailedQuestionsOption page={"detailedQuestion"} setPage={setPage} />
                </Row>
            </div>
            <div id="faq-box" className="Page-Box">
                <div className="subtitle" style={{fontSize: "25px", fontWeight: "5px"}}>FAQ</div>
                <Row>
                    <FAQOption page={"faqPage"} setPage={setPage} />
                </Row>
            </div>
        </div>
    </div>
    </div>
)
}