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
        messages: [{ role: "user", content: `Here is the industry that the user wants to work in: ${prompt}. 
            Please generate me 10 open-ended questions relating to the user's preferred industry formatted in a JSON array. 
            Make sure the response is only the JSON array and no other text. These questions should be meant for someone who does not
            have any experience in the industry and should be used to help them decide if they want to go into this industry, but also leave the
            questions broad to allow for a variety of answers.
            Format is below: 
            [
                {
                    "id": "Question ID as an integer",
                    "body": "Open-ended question"
                },
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
        console.error("Error in GPT API call:", error);
        throw new Error("Failed to fetch GPT response");
    }

}