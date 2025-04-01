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
      
      <Button className="Header-Button" onClick={homeState}>Home Page</Button>
      <Button className="Header-Button" onClick={basicButtonState}>Basic Questions</Button>
      <Button className="Header-Button" onClick={detailedButtonState}>Detailed Questions</Button>
      <Button className="Header-Button" onClick={faqState}>FAQ</Button>

    </div>
 
)
}