import { BasicQuestionsOption } from "../basic-questions/BasicQOption";
import { DetailedQuestionsOption } from "../detailed-questions/DetailedQOption";
import { FAQOption } from "../faq/FAQOption";
import {Row} from "react-bootstrap"
import "./HomePage.css";
import React from "react";

interface HomePageProp {
    setPage: (page: string) => void;
}

export function HomePage({setPage}: HomePageProp) {
    return (
    <div data-testid="home-page" className="Home-page">
        
        <div className='Box-Container'>
            <div id="basic-questions-box" className="Page-Box">
            <div className="subtitle" style={{fontSize: "25px", fontWeight: "5px"}}>Basic Quiz</div>
                <Row>
                    <BasicQuestionsOption setPage={setPage}/>
                </Row>
            </div>
            <div id="detailed-questions-box" className="Page-Box">
                <div className="subtitle" style={{fontSize: "25px", fontWeight: "5px"}}>Detailed Quiz</div>
                <Row>
                    <DetailedQuestionsOption setPage={setPage} data-testId="detailed-option"/>
                </Row>
            </div>
            <div id="faq-box" className="Page-Box">
                <div className="subtitle" style={{fontSize: "25px", fontWeight: "5px"}}>FAQ</div>
                <Row>
                    <FAQOption setPage={setPage} data-testId="faq-option"/>
                </Row>
            </div>
        </div>
    </div>
)
}