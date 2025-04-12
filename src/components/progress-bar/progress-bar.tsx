import React from 'react';
import './progress-bar.css';
interface ProgressBarProps {
    progress: number;
    setProgress: (progress: number) => void;
}
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
                <div className="progress-bar-fill" style={{ width : `${progress}%`, backgroundColor : getColor()}}></div>
            </div>
            <div className="progress-label">{progress.toFixed(2)}%</div>
            
        </div>
    )
}