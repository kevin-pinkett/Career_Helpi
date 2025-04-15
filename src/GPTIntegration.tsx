import OpenAI from "openai";


export async function getGPTResponse(prompt: string, key:string) {
    const openai = new OpenAI({apiKey: key});
    try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: `Here is the list of questions and answers 
            that the user answered in a career quiz ${prompt}. Please respond with three 
            viable career options in the form of a JSON array, in this format.
            
    [
        {
            "title": "Career Title",
            description: "Brief description of the career",
            traits: ["Trait 1", "Trait 2", "Trait 3"],
            jobRoles: ["Job role 1", "Jobrole 2", "Job role 3"],
            skills: ["Skill 1", "Skill 2", "Skill 3"]
        }
    ]` 
}],
    });
    const responseString = response.choices[0].message.content;
    if (responseString === null) {
        throw new Error("null response from ChatGPT");
    }
    return JSON.parse(responseString);
    
    } catch (error) {
        console.error("ai error:", error);
        throw error;
    }}
    