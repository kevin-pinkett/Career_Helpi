import { DetailedQuestions } from "./DetailedQuestions"

interface DetailedQuestionsPageProp {
    setPage: (page: string) => void;
}

export function DetailQuestionsPage({setPage}: DetailedQuestionsPageProp) {
    return (
    <div className="DetailQuestions">
    <h1>Detailed Questions</h1>
    <DetailedQuestions></DetailedQuestions>
    </div>
)
}