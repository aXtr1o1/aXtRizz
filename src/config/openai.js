// Description: This file contains the function that sends a user prompt to the OpenAI chatbot API and returns the chatbot's response.
async function runChat(userPrompt) {
    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userPrompt }),
        });

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error:", error);
        return "Oops! Something went wrong.";
    }
}

export default runChat;
