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
      <div>
        <p>{text}</p>
        <Button onClick={() => setPage(destination)}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}