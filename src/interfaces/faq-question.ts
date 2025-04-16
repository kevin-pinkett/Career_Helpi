//A representation of a Basic Question
export interface FAQ_Question {
    //A unique identifier for questions
    id: number;
    //The question being asked
    question: string;
    //The possible answers to the question
    answer: string;
}