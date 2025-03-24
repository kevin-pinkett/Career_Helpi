import { useState } from "react";
import { Button } from "react-bootstrap";


export function Header() {

    const [page, setPage] = useState<string>("homePage"); 

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