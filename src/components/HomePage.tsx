import { BasicQuestionsOption } from "./BasicQOption";
import {Row} from "react-bootstrap"

interface HomePageProp {
    setPage: (page: string) => void;
}

export function HomePage({setPage}: HomePageProp) {
    return (
    <div className="HomePage">
    <h1>Home Page</h1>
    <Row>
        <BasicQuestionsOption page={"basicQuestion"} setPage={setPage} />
    </Row>
    </div>
)
}