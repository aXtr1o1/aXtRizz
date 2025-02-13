import { createContext, useState, useEffect } from "react";
import { TrackGoogleAnalyticsEvent } from "../analytics";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [showChatbot, setShowChatbot] = useState(false);

    // Clears session storage on page reload
    useEffect(() => {
        sessionStorage.clear();
        setChatHistory([]);
    }, []);

    // Generate a session ID (not needed across refresh)
    const sessionId = crypto.randomUUID();

    // Function to save chat history in sessionStorage (only last 20 messages)
    const saveChatHistory = (messages) => {
        const last20Messages = messages.slice(-20);
        sessionStorage.setItem(`chatHistory_${sessionId}`, JSON.stringify(last20Messages));
    };

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setChatHistory([]);
        setShowChatbot(false);
        sessionStorage.clear(); // Clears session storage
    };

    const onSent = async (prompt) => {
        TrackGoogleAnalyticsEvent("user_message_sent", {
            message: "rizzing..."
        });
        setShowChatbot(true);
        setResultData("");
        setLoading(true);
        setShowResult(true);

        const currentPrompt = prompt ?? input;
        setPrevPrompts((prev) => [...prev, currentPrompt]);
        setInput("");
        setRecentPrompt(currentPrompt);

        // Prepare messages for backend request
        const updatedChatHistory = [...chatHistory, { role: "user", content: currentPrompt }];
        
        const response = await fetch("http://134.209.150.173:5001/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, userPrompt: currentPrompt, chatHistory: updatedChatHistory }),
        });

        const data = await response.json();
        const newMessage = { role: "assistant", content: data.message };

        // Update chat history only once (avoiding duplication)
        const finalChatHistory = [...updatedChatHistory, newMessage].slice(-20);
        setChatHistory(finalChatHistory);
        saveChatHistory(finalChatHistory);

        // Display animated response
        let responseArray = data.message.split("**");
        let newResponse = responseArray.map((text, i) => (i % 2 === 1 ? `<b>${text}</b>` : text)).join("");
        let formattedResponse = newResponse.split("*").join("</br>").split(" ");
        setResultData("");
        formattedResponse.forEach((word, i) => delayPara(i, word + " "));

        setLoading(false);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        chatHistory,
        setChatHistory,
        showChatbot,
        setShowChatbot,
    };

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
