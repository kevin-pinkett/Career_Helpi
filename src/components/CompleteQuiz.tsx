import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface CompletedQuizProps{
    //questions: [string];
    //answers: [string];
    setPage: (page: string) => void;
}

export function CompletedQuiz({setPage}: CompletedQuizProps){
    const [popUpOpen, setPopup] = useState<boolean>(true);

    function Submit(): void {
        setPopup(false);
        setPage("Results-Page");
        // some way to get questions/type/answers to results/API need a function for this
    }

    return <span> {popUpOpen && <div style={{backgroundColor: "white"}}>
        You have answered all questions!
        <Button onClick = {() => setPopup(false)}> Continue Working </Button>
        <Button onClick = {Submit}> Submit </Button>
        </div>}
    </span>
}