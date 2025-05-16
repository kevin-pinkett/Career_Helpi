import { useEffect, useState } from "react";
import "./TextToSpeech.css";

interface ConvertToSpeechProps {
  text: string;
}

/** Copilot Generated
 * Code influenced by ChatGPT
 * Text-to-Speech (TTS) component that converts a given text into speech
 * and provides play/pause functionality for the generated audio.
 *
 * @param {ConvertToSpeechProps} props - The props for the TTS component.
 * @param {string} props.text - The text to be converted into speech.
 *
 * @returns {JSX.Element} A React component that displays a play/pause button
 * and handles the audio playback of the generated speech.
 *
 * @remarks
 * - The component fetches the speech audio as a Blob using the `getSpeech` function.
 * - It manages the audio playback state (`isPlaying`) and loading state (`isLoading`).
 * - Displays a loading indicator while the audio is being prepared.
 * - Uses an `HTMLAudioElement` to play the generated speech audio.
 *
 * @example
 * ```tsx
 * <TTS text="Hello, world!" />
 * ```
 */
export function TTS({ text }: ConvertToSpeechProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || '""');

    if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
      setIsLoading(true);
      return;
    }

    setIsLoading(true);

    getSpeech(text, apiKey).then((blob) => {
      const audioURL = URL.createObjectURL(blob);
      const newAudio = new Audio(audioURL);

      newAudio.onended = () => setIsPlaying(false);
      setAudio(newAudio);
      setIsLoading(false);
    }).catch((error) => {
      console.error("Failed to fetch speech:", error);
      setIsLoading(true); // stay loading on error
    });
  }, [text]);

  const handlePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleLoading = () => {
    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || '""');
    if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === ""){
      window.alert("Input your API Key!");
    }
  }

  return (
    <div>
      {isLoading ? (
        <img className="play-button" src="assets/Load.png" alt="Loading" onClick={handleLoading}></img>
      ) : (
        <img
          className="play-button"
          onClick={handlePlayPause}
          alt={isPlaying ? "⏹️" : "▶️"}
          src={isPlaying ? "assets/Pause.png" : "assets/Play.png"}
        />
      )}
    </div>
  );
}

async function getSpeech(text: string, apiKey: string): Promise<Blob> {
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1",
      input: text,
      voice: "nova",
    }),
  });

  if (!response.ok) {
    throw new Error(`TTS failed: ${response.statusText}`);
  }

  return await response.blob();
}