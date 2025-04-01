import { BasicQuestionsOption } from "./BasicQOption";

interface HomePageProp {
    setPage: (page: string) => void;
}

export function HomePage({setPage}: HomePageProp) {
    return (
    <div className="HomePage">
    <h1>Home Page</h1>
    <BasicQuestionsOption page={"basicQuestion"} setPage={setPage} />
    </div>
)
}