import { Button, } from "react-bootstrap";

interface NavOptionProps {
    setPage: (page: string) => void;
    destination: string;
    text: string;
    buttonText: string;
  }

export function NavOption({setPage, destination, text, buttonText}: NavOptionProps) {
    return (
    <div>
      <div style={{color: "var(--text-color-2)"}}>
        <p>{text}</p>
        <Button onClick={() => setPage(destination)}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}