import {createContext, useState} from "react";
import runChat from "../config/openai";

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
    const [currentChat, setCurrentChat] = useState(null); // ADD currentChat state

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setChatHistory([]);
        setShowChatbot(false);
        setCurrentChat(null); // Clear currentChat on new chat - ADD THIS LINE
    }

    const onSent = async (prompt) => {

        setShowChatbot(true);
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let currentPrompt;
        if (prompt !== undefined) {
            currentPrompt = prompt;
        } else {
            setPrevPrompts(prev => [...prev, input]);
            currentPrompt = input;
        }

        // Move previous currentChat to history, if it exists
        if (currentChat) {
            setChatHistory(prevHistory => [...prevHistory, currentChat]);
        }
        setInput("");

        setRecentPrompt(currentPrompt);
        const response = await runChat(currentPrompt);

        // Set the new current chat (will be moved to history on next input)
        setCurrentChat({ prompt: currentPrompt, response: response });


        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        setResultData("");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
    }

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
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;