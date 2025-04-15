import OpenAI from "openai";


export async function getGPTResponse(prompt: string) {


    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || '""'); 
    if (!apiKey) {
        throw new Error("Missing API key");
    }
    const openai = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});
    try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: `Here is the list of questions and answers 
            that the user answered in a career quiz ${prompt}. Notice that a 0 = strongly disagree, 1 = disagree, 2 = neutral, 3 = agree, 4 = strongly agree. Please respond with three 
            viable career options in the form of a JSON array. Make sure the response is only JSON array and no other text. The format is below.
            
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
    console.log("Raw AI Response:", responseString);

    if (!responseString) {
        throw new Error("response is null");
    }
    const cleanedResponse = responseString.replace(/```json|```/g, "").trim();

    return JSON.parse(cleanedResponse);
    
    } catch (error) {
        console.error("ai error:", error);
        throw error;
    }}
    