import { Button } from "react-bootstrap";
import confetti from "canvas-confetti";
import "./CompleteQuiz.css"
import { useEffect, useState } from "react";

interface CompletedQuizProps{
    isPopupOpen: boolean;
    closePopup:(isPopupOpen: boolean) => void;
    setPage: (page: string) => void;
}

/**
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

    useEffect(() => {
        if (!isPopupOpen) return;
    
        const duration = 5 * 1000; // 5 seconds
        const end = Date.now() + duration;
    
        const frame = () => {
          // Left side burst
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 1 },
            colors: ["#f53b55", "#f43bc4", "#f5953b"],
          });
    
          // Right side burst
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 1 },
            colors: ["#f53b55", "#f43bc4", "#f5953b"],
          });
    
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
    
        frame();
      }, [isPopupOpen]);

    return ( 
        <div> 
            <div>
                {isPopupOpen && <div style={{ 
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999,
                    pointerEvents: "none",
                }}>
                </div>}
            </div>

            {isPopupOpen && <div className="popup">
                <div className="popup-content">
                <img src="assets/Helpi Mascot (partyclear).png" alt="mascot" style={{
                    display: "flex",
                    justifySelf: "center",
                    height: "50%",
                    width: "50%",
                    margin: "15px"
                    }}></img>
                    <h3>You have answered all questions!</h3>
                    <div className="popup-buttons">
                        <Button onClick={() => closePopup(false)}>Continue Working</Button>
                        <Button onClick={Submit}>Submit</Button>
                    </div>
                </div>
            </div>}
        </div>
    )
}