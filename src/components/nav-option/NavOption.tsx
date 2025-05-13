import { Button, } from "react-bootstrap";
import "./NavOption.css";

interface NavOptionProps {
    setPage: (page: string) => void;
    destination: string;
    text: string;
    buttonText: string;
    disabled: boolean;
  }

export function NavOption({setPage, destination, text, buttonText, disabled}: NavOptionProps) {
    return (
    <div>
      <div >
        <p>{text}</p>
        <div>
        <Button className={"NavButton"} onClick={() => setPage(destination)}
          disabled={disabled}>
          {buttonText}
        </Button>
        </div>
      </div>
    </div>
  );
}