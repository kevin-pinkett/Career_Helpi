import { Button } from "react-bootstrap";

interface BasicQuestionProps {
    page: string;
    setPage: (page: string) => void;
  }

export function BasicQuestionsOption({page, setPage}: BasicQuestionProps) {
    const basicButtonState = () => {
        setPage("basicPage");
      };

    return (<div style={{}}>
        <Button className="BasicQuestions-Button" onClick={basicButtonState}>Basic Questions</Button>
    </div>
)
}