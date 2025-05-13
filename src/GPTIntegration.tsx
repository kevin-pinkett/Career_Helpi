import OpenAI from "openai";


/**
 * Sends a prompt to the GPT model and retrieves a structured JSON response with career suggestions.
 *
 * @param {string} prompt - The input string containing the user's career quiz answers and instructions for GPT.
 * @returns {Promise<Array<{ 
 *   title: string; 
 *   description: string; 
 *   traits: string[]; 
 *   jobRoles: string[]; 
 *   skills: string[]; 
 *   link: string;
 *      
 * }>>} A promise that resolves to an array of career options, each containing a title, description, traits, job roles, and skills.
 *
 * @throws {Error} Throws an error if the API key is missing, the response is null, or if there is an issue with the GPT API call.
 *
 * @example
 * const prompt = "User's quiz answers...";
 * getGPTResponse(prompt)
 *   .then(careers => console.log(careers))
 *   .catch(error => console.error(error));
 */
export async function getGPTResponse(prompt: string) {


    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || '""'); 
    if (!apiKey) {
        throw new Error("Missing API key");
    }
    const openai = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});

    try {
        console.log(prompt);
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        
        messages: [
            {
                role: "system",
                content: "You are a helpful and concise career advisor. You only respond with a JSON array, no other text."
            },
            
            { role: "user", content: `Here is the list of questions and answers 
            that the user answered in a career quiz ${prompt}. Please respond with three 
            viable career options in the form of a JSON array. Make sure the response is only JSON array and no other text.
            Object must contain these fields:
            - title: The career title
            - description: A short description of the career
            - traits: 3-5 personality traits that align with this career
            - jobRoles: 3-5 potential job titles or paths
            - skills: 3-5 relevant skills for this career
            - link: A URL where users can learn more about the career (“Please provide a link to a reputable site like onetonline.org or bls.gov for each career.”)
            
    Format is below: 
    [
        {
            "title": "Career Title",
            description: "Brief description of the career",
            traits: ["Trait 1", "Trait 2", "Trait 3"],
            jobRoles: ["Job role 1", "Jobrole 2", "Job role 3"],
            skills: ["Skill 1", "Skill 2", "Skill 3"],
            link: "https://example.com/more-info"
        }
    ]` 
}],
    });
    const responseString = response.choices[0]?.message?.content;
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
    