import { BasicQuestions } from "./BasicQuestions"

interface BasicQuestionsPageProp {
    setPage: (page: string) => void;
}

export function BasicQuestionsPage({setPage}: BasicQuestionsPageProp) {
    return (
    <div className="Basic-Questions">
    <h1>Basic Quiz</h1>
    <BasicQuestions></BasicQuestions>
    </div>
)
}