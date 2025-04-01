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
    <Button style={{ flex: 1 }} className="Header-Button"  
    onClick={homeState} disabled={page === "homePage"}>Home Page</Button>
    <Button style={{ flex: 1 }}className="Header-Button" 
    onClick={basicButtonState} disabled={page === "basicPage"}>Basic Quiz</Button>
    <Button style={{ flex: 1 }}className="Header-Button" 
    onClick={detailedButtonState} disabled={page === "detailedPage"}>Detailed Quiz</Button>
    <Button style={{ flex: 1 }}className="Header-Button" 
    onClick={faqState} disabled={page === "faqPage"}>FAQ</Button>
    </div>
    </div>
)
}