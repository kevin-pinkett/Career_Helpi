import OpenAI from "openai";

const openai = new OpenAI();

export async function getGPTResponse(prompt: string) {
    try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: `Here is the list of questions and answers 
            that the user answered in a career quiz ${prompt}. Please respond with three 
            viable career options in the form of a JSON array, in this format.` }],
    });
    return response.choices[0].message.content;
    } catch (error) {
        console.error("ai error:", error);
        throw error;
    }}
    