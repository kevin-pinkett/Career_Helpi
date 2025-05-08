import React, { createContext, useState, useContext, useEffect } from 'react';

type TextSize = 'small' | 'medium' | 'large'

interface TextSizeType {
    textSize: TextSize;
    setSize: (size: TextSize) => void;
  }

const TextSizeContext = createContext<TextSizeType>({
    textSize: "small",
    setSize: () => {},
  });

export const TextSizeProvider = ({ children }: {children: React.ReactNode}) => {
    const [textSize, setTextSize] = useState<TextSize>(() => {
        const stored = localStorage.getItem('data-text-size') as TextSize | null;
        return stored === 'small' || stored === 'large' ? stored : 'medium';
      });
    
    useEffect(() => {
        document.documentElement.setAttribute('data-text-size', textSize);
        localStorage.setItem('data-text-size', textSize);
    }, [textSize]);
    
    return (
        <TextSizeContext.Provider value={{ textSize, setSize: setTextSize }}>
          {children}
        </TextSizeContext.Provider>
    );
};

export const useTextSize = () => useContext(TextSizeContext);

