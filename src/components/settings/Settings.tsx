import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "./Settings.css"
import { ThemeToggle } from '../dark-mode/theme-toggle';
import { ChooseTextSize } from '../text-size/TextSize';


export function SettingsPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  
  return (
    <div>
        <Button style={{fontSize: "var(--gear)"}} onClick={isOpen ? handleClose : handleOpen}> ⚙︎ </Button>
        <Settings isOpen={isOpen}>
          <div>
            <div className='theme-selector'><ThemeToggle/></div>
            <div className='text-selector'><ChooseTextSize/></div>
          </div>
        </Settings>
    </div>
  )
}

interface SettingProps {
    isOpen: boolean;
    children?: React.ReactNode;
}


function Settings ({ isOpen, children }: SettingProps) {
    if (!isOpen) return null;

    return (
      <div className="popup-box-settings">
        {children}
      </div>
    );
  };