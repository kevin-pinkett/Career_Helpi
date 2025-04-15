import { Button } from "react-bootstrap";
import "./CompleteQuiz.css"

interface CompletedQuizProps{
    //questions: [string];
    //answers: [string];
    isPopupOpen: boolean;
    closePopup:(isPopupOpen: boolean) => void;
    setPage: (page: string) => void;
    answers: number[];
}

export function CompletedQuiz({isPopupOpen, closePopup, setPage, answers}: CompletedQuizProps){

    function Submit(): void {
        closePopup(false);
        setPage("resultsPage");
        console.log(answers)
        // some way to get questions/type/answers to results/API need a function for this

    }

    return <div> {isPopupOpen && <div className="popup">
            <div className="popup-content">
                <h3>You have answered all questions!</h3>
                <div className="popup-buttons">
                    <Button onClick={() => closePopup(false)}>Continue Working</Button>
                    <Button onClick={Submit}>Submit</Button>
                </div>
            </div>
        </div>}
    </div>
}