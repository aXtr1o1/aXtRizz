import React, { useContext, useEffect, useRef, useState } from 'react';
import './Chatbot.css';
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/context.jsx";

const Chatbot = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, chatHistory } = useContext(Context);
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);

    useEffect(() => {
        const updateRows = () => {
            setRows(window.innerWidth <= 600 ? 2 : 1);
        };
        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [chatHistory, resultData]);

    return (
        <div className="chatbot">
            <div className='result' ref={resultRef}>
                {chatHistory.length === 0 && !showResult ? (
                    <p className="empty-chat"></p>
                ) : (
                    chatHistory.slice(0, -2).map((chatItem, index) => (
                        <div key={index}>
                            {chatItem.role === "user" ? (
                                <div className="result-title user-prompt">
                                    <p>{chatItem.content}</p>
                                </div>
                            ) : (
                                <div className="result-data bot-response">
                                    <p dangerouslySetInnerHTML={{ __html: chatItem.content }}></p>
                                </div>
                            )}
                        </div>
                    ))
                )}

                {showResult && (
                    <>
                        <div className="result-title current-prompt">
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data current-response">
                            {loading ? (
                                <div className='loader'>
                                    <hr /><hr /><hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData || "No response available." }}></p>
                            )}
                        </div>
                    </>
                )}
            </div>

            <div className="main-bottom">
                <div className="search-box">
                    <textarea 
                        rows={rows} 
                        onChange={(e) => {
                            setInput(e.target.value);
                            const lineCount = e.target.value.split('\n').length;
                            setRows(lineCount < 3 ? lineCount : 3);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                onSent();
                            }
                        }}
                        value={input}
                        placeholder="Talk to me"
                        style={{ color: 'white', alignContent: 'center', resize: 'none' }}
                    />
                    <div className="icon-container">
                        <button type="submit" onClick={onSent}>
                            <img src={assets.send_icon} alt="Send"/>
                        </button>
                    </div>
                </div>
                <p className="bottom-info" style={{ color: 'white' }}>
                    Caution! You might get Rizzed
                </p>
            </div>
        </div>
    );
};

export default Chatbot;
