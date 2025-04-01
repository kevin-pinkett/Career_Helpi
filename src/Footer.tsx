import React, { useState } from 'react';
import './Footer.css';
import { Form, Button } from 'react-bootstrap';

export function Footer() {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
        <div className='hover-area' onMouseEnter={() => setVisible(true)}></div>
        <footer
        style={{
          opacity: visible ? 1 : 0, 
          visibility: visible ? "visible" : "hidden", // Ensures it doesn't block clicks when hidden
          transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "black",
          color: "white",
          textAlign: "center",
          padding: "15px",
          minHeight: "50px", // Ensures it's not collapsed
        }}
        onMouseLeave={() => setVisible(false)}
      >
        Hello
      </footer>
    </>
    )
}