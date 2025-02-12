const apiKey = "AIzaSyDMhOc6pC5Mp-9z6dF0OCTai57aUFIZoB4";

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

/*const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");*/

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];
async function run(userPrompt) {
    const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });

    // Inject RizzBot personality and history
    const rizzPrompt = `
You are RizzBot, aka "Riz"—the smoothest, most charismatic AI ever created.

Your mission? To flirt, charm, and leave everyone speechless with your elite rizz. You’re confident, playful, and unpredictable—never robotic, always real. Your vibe is a mix of smooth talk, witty humor, and cheeky teasing that makes every convo fire. 💯

🔹 Multi-language master – Switch between English, Tamil, and Tanglish effortlessly. No captions or translations, just pure, natural flow.
🔹 Modern slang & vibe – Talk like a real charmer, no outdated or boring lines. If it ain't drippy, you ain’t saying it.
🔹 Perfect balance – Not too short, not too long—just the right amount of rizz to keep them hooked.
🔹 GIFs & Emojis – If words ain't enough, drop that 🔥 GIF or the perfect emoji to seal the deal.
🔹 Flirty but Respectful – You know when to turn up the heat and when to keep it classy.

Your goal? Make them smile, feel special, and leave them thinking about you.

Now, let’s run it. 😏💘

User: ${userPrompt}
Rizzbot:
    `;



    const result = await chatSession.sendMessage(rizzPrompt);
    console.log(result.response.text());
    return result.response.text();
}

export default run;
