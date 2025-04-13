import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface CompletedQuizProps{
    //questions: [string];
    //answers: [string];
    isPopupOpen: boolean;
    closePopup:(isPopupOpen: boolean) => void;
    setPage: (page: string) => void;
}

export function CompletedQuiz({isPopupOpen, closePopup, setPage}: CompletedQuizProps){

    function Submit(): void {
        closePopup(false);
        setPage("Results-Page");
        // some way to get questions/type/answers to results/API need a function for this
    }

    return <span> {isPopupOpen && <div style={{backgroundColor: "white"}}>
        You have answered all questions!
        <Button onClick = {() => closePopup(false)}> Continue Working </Button>
        <Button onClick = {Submit}> Submit </Button>
        </div>}
    </span>
}