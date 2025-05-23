import React from 'react';
import './progressBar.css';

interface ProgressBarProps {
    progress: number;
    setProgress: (progress: number) => void;
}

/** Copilot Generated Doc
 * 
 * A functional component that renders a progress bar with dynamic color and width
 * based on the `progress` value. The progress bar changes color depending on the
 * progress percentage:
 * - Red (#ff0000) for progress less than 40%.
 * - Orange (#ffa500) for progress between 40% and 70%.
 * - Green (#2ecc71) for progress 70% and above.
 *
 * @param {ProgressBarProps} props - The props for the ProgressBar component.
 * @param {number} props.progress - The current progress value (percentage) to display.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setProgress - A function to update the progress value.
 * @returns {JSX.Element} The rendered progress bar component.
 */
export function ProgressBar({progress, setProgress}: ProgressBarProps) {
    const getColor = () => {
        if (progress < 40) {
            return "#ff0000";
        }
        else if (progress < 70) {
            return "#ffa500";
        }
        else {
            return "#2ecc71";
        }
    }
    return(
        <div className="container">
            <div className="progress-bar">
                <img src="assets/Helpi Mascot.png" alt="mascot" style={{
                    width: "20%",
                    padding: "15px",
                    position: "absolute",
                    left: `${progress}%`,
                    transform: "translateX(-50%)",
                    zIndex: "1",
                    pointerEvents: "none",
                    transition: "left 0.3s ease-in-out"
                }}></img>
                <div data-testid="bar-fill" 
                     className="progress-bar-fill" 
                     style={{ width : `${progress}%`, backgroundColor : getColor() }}>
                </div>
            </div>
            <div style={{ color: "var(--text-color-2)", fontSize: "var(--small-text)"}} className="progress-label">{progress.toFixed(2)}%</div>
            
        </div>
    )
}