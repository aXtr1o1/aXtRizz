import React, {useContext, useEffect, useRef, useState} from 'react';
import './Chatbot.css';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/context.jsx";

const Chatbot = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, chatHistory} = useContext(Context); // Get chatHistory from context
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 600) {
                setRows(2);
            } else {
                setRows(1);
            }
        };

        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [chatHistory, resultData]); // Add resultData to dependency array


    return (
        <div className="chatbot">
            <div className='result' ref={resultRef}>
                {!showResult
                    ?
                    <>
                        {chatHistory.map((chatItem, index) => (
                            <div key={index}>
                                <div className="result-title user-prompt"> {/* Add user-prompt class for styling */}
                                    <p>{chatItem.prompt}</p>
                                </div>
                                <div className="result-data bot-response"> {/* Add bot-response class for styling */}
                                    <p dangerouslySetInnerHTML={{ __html: chatItem.response }}></p>
                                </div>
                            </div>
                        ))}
                     </>
                    :
                    <>
                        {chatHistory.map((chatItem, index) => (
                            <div key={index} className="history-item"> {/* Render history even when showing current result */}
                                <div className="result-title user-prompt">
                                    <p>{chatItem.prompt}</p>
                                </div>
                                <div className="result-data bot-response">
                                    <p dangerouslySetInnerHTML={{ __html: chatItem.response }}></p>
                                </div>
                            </div>
                        ))}
                        <div className="result-title current-prompt"> {/* Style current prompt differently if needed */}
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data current-response"> {/* Style current response differently if needed */}
                            {loading ?
                                <div className='loader'>
                                    <hr/>
                                    <hr/>
                                    <hr/>
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                            }
                        </div>
                    </>
                }
            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <textarea rows={rows} onChange={(e) => setInput(e.target.value)}
                              onKeyUp={(e) => {
                                  if (e.key === 'Enter') {
                                      onSent();
                                  }
                              }}
                              value={input}
                              type="text"
                              placeholder="Talk to me"
                              style={{ color: 'white', alignContent: 'center'}}
                    />
                    <div className="icon-container">
                        <button type="submit" onClick={() => onSent()}><img src={assets.send_icon} alt=""/></button>
                    </div>
                </div>
                <p className="bottom-info" style={{color:'white'}}>
                    Caution! You might get Rizzed
                </p>
            </div>
        </div>
    );
}

export default Chatbot;