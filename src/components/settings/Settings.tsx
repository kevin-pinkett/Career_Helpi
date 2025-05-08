import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "./Settings.css"
import { ThemeToggle } from '../dark-mode/theme-toggle';


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
          <ThemeToggle/>
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