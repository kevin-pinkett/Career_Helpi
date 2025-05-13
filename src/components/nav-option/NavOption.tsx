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
      <div style={{color: "var(--text-color-2)", fontSize: "var(--small-text)"}} >
        <p>{text}</p>
        <div>
        <Button className={"NavButton"} style={{fontSize: "var(--small-text)"}} onClick={() => setPage(destination)}
          disabled={disabled}>
          {buttonText}
        </Button>
        </div>
      </div>
    </div>
  );
}