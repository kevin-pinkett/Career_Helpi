//A representation of a Basic Question
export interface Basic_Question {
    //A unique identifier for questions
    id: number;
    //The question being asked
    body: string;
    //The possible answers to the question
    options: string[];
}