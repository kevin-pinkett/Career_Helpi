import { Button } from "react-bootstrap";
import "./CompleteQuiz.css"

interface CompletedQuizProps{
    isPopupOpen: boolean;
    closePopup:(isPopupOpen: boolean) => void;
    setPage: (page: string) => void;
}

/** Copilot Generated Doc
 * 
 * A React functional component that represents a popup displayed when the user has completed a quiz.
 * The popup provides options to either continue working or submit the quiz.
 *
 * @param {CompletedQuizProps} props - The props for the CompletedQuiz component.
 * @param {boolean} props.isPopupOpen - A boolean indicating whether the popup is open.
 * @param {(isOpen: boolean) => void} props.closePopup - A function to close the popup by setting its open state.
 * @param {(page: string) => void} props.setPage - A function to navigate to a different page, such as the results page.
 *
 * @returns {JSX.Element} The JSX element representing the popup.
 */
export function CompletedQuiz({isPopupOpen, closePopup, setPage}: CompletedQuizProps){

    function Submit(): void {
        closePopup(false);
        setPage("resultsPage");
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