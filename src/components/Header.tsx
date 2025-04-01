import { useState } from 'react';
import './Header.css';
import { Button } from "react-bootstrap";

interface HeaderProps {
  page: string;
  setPage: (page: string) => void;
}


export function Header({page, setPage}: HeaderProps) {

      const homeState = () => {
        setPage("homePage");

      };
      const basicButtonState = () => {
        setPage("basicPage");
      };
      const detailedButtonState = () => {
        setPage("detailedPage");
      };
      const faqState = () => {
        setPage("faqPage");
      };

    return (
    <div className="Header">
      <div style={{ display: 'flex', width: '100%' }}>
    <Button style={{ flex: 1 }} className={page === "homePage" ? "Header-ButtonSelected" : "Header-ButtonUnselected"}  
    onClick={homeState} disabled={page === "homePage"}>Home Page</Button>
    <Button style={{ flex: 1 }}className={page === "basicPage" ? "Header-ButtonSelected" : "Header-ButtonUnselected"} 
    onClick={basicButtonState} disabled={page === "basicPage"}>Basic Questions</Button>
    <Button style={{ flex: 1 }}className={page === "detailedPage" ? "Header-ButtonSelected" : "Header-ButtonUnselected"} 
    onClick={detailedButtonState} disabled={page === "detailedPage"}>Detailed Questions</Button>
    <Button style={{ flex: 1 }}className={page === "faqPage" ? "Header-ButtonSelected" : "Header-ButtonUnselected"} 
    onClick={faqState} disabled={page === "faqPage"}>FAQ</Button>
    </div>
    </div>
)
}