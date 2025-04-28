import { createContext, useContext, useState } from "react";

type SetPlayingFn = ((playing: boolean) => void) | null;

interface SpeechContextType {
    currentSetPlaying: SetPlayingFn;
    setCurrentSetPlaying: (fn: SetPlayingFn) => void;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

/** Copilot Generated Doc
 * 
 * Function largely contibuted to by ChatGPT
 * 
 * Provides a context for managing speech-related functionality within the application.
 * 
 * This component wraps its children with a `SpeechContext.Provider` that supplies
 * the current speech-playing state and a function to update it.
 * 
 * @param children - The child components that will have access to the speech context.
 * 
 * @returns A `SpeechContext.Provider` component that provides the speech-playing state
 *          and updater function to its children.
 */
export function SpeechProvider({ children }: { children: React.ReactNode }) {
    const [currentSetPlaying, setCurrentSetPlaying] = useState<SetPlayingFn>(null);

    return (
        <SpeechContext.Provider value={{ currentSetPlaying, setCurrentSetPlaying }}>
            {children}
        </SpeechContext.Provider>
    );
}

export function useSpeechContext() {
    const context = useContext(SpeechContext);
    if (!context) {
        throw new Error("useSpeechContext must be used inside a SpeechProvider");
    }
    return context;
}