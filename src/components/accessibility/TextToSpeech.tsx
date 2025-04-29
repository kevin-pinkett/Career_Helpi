import { useEffect, useState } from "react";
import { useSpeechContext } from "./SpeechContext";
import "./TextToSpeech.css";

interface ConvertToSpeechProps {
    text: string;
}

export function ConvertToSpeech({ text }: ConvertToSpeechProps) {
    const { currentPlayingText, setCurrentPlayingText } = useSpeechContext();
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const newUtterance = new SpeechSynthesisUtterance(text);

        newUtterance.onend = () => {
            setCurrentPlayingText(null);
        };

        setUtterance(newUtterance);

        

        return () => {
            synth.cancel();
        };
    }, [text, setCurrentPlayingText]); 

    useEffect(() => {
        setIsPlaying(currentPlayingText === text);
    }, [currentPlayingText, text]);

    function handlePlay() {
        if (utterance) {
            console.log(utterance.text);
            const synth = window.speechSynthesis;
            synth.cancel();
            setCurrentPlayingText(text);
            synth.speak(utterance);
        }
    }

    function handleStop() {
        if (utterance) {
            const synth = window.speechSynthesis;
            synth.cancel();
            setCurrentPlayingText(null);
        }
    }

    return (
        <div>
            <img
                className="play-button"
                onClick={isPlaying ? handleStop : handlePlay}
                alt={isPlaying ? "⏹️" : "▶️"}
                src={isPlaying ? "assets/Pause.png" : "assets/Play.png"}
            />
        </div>
    );
}