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
        <Button style={{fontSize: "30px"}} onClick={isOpen ? handleClose : handleOpen}> ⚙︎ </Button>
        <Settings isOpen={isOpen}>
          <div style={{ position: "absolute", top: "10px", right: "10px"}}><Button onClick={() => setIsOpen(false)}>X</Button></div>
          <ThemeToggle/>
          <ChooseTextSize/>
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
      <div className="popup-overlay">
        <div className="popup-content">
          {children}
        </div>
      </div>
    );
  };