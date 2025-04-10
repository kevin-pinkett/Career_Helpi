import OpenAI from "openai";

const openai = new OpenAI();

export async function getGPTResponse(prompt: string) {
    try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: "prompt" }],
    });
    return response.choices[0].message.content;
    } catch (error) {
        console.error("ai error:", error);
        throw error;
    }}
    