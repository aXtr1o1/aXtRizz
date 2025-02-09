import React, {useContext, useEffect, useRef, useState} from 'react';
import './Main.css';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/context.jsx";

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);
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
    }, [resultData]);

    return (
        <main className="main">
            <nav  className="nav">
                <p onClick={() => newChat()} id='title'>aXtRizz</p>
                
            </nav>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">
                            <p id='bold'><span>Learn Rizzonomics</span></p>
                            <p>Show and get rizzed !</p>
                        </div>
                        <div className="cards">
                        <div className="card"

onClick={() => setInput("Are you a patent? Because I'd like to explore your intellectual property.")}>

<p>Are you a patent? Because I'd like to explore your intellectual property.</p>

<img src={assets.compass_icon} alt=""/>

</div>

<div className="card"

onClick={() => setInput("Is your heart a manufacturing plant? Because it's producing some serious feelings for me.")}>

<p>Is your heart a manufacturing plant? Because it's producing some serious feelings for me.</p>

<img src={assets.bulb_icon} alt=""/>

</div>

<div className="card"

onClick={() => setInput("Do you work for the patent office? Because you've got 'fine' written all over you.")}>

<p>Do you work for the patent office? Because you've got 'fine' written all over you.</p>

<img src={assets.message_icon} alt=""/>

</div>

<div className="card" onClick={() => setInput("Are you an HVAC system? Because you've got me feeling hot and bothered.")}>

<p>Are you an HVAC system? Because you've got me feeling hot and bothered.</p>

<img src={assets.code_icon} alt=""/>

</div>






                        </div>
                    </>
                    :
                    <div className='result' ref={resultRef}>
                        <div className="result-title">
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            
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
                    </div>
                }
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
                        />
                        <div className="icon-container">
                            <button type="submit" onClick={() => onSent()}><img src={assets.send_icon} alt=""/></button>
                        </div>
                    </div>
                    <p className="bottom-info">
                        Responses are generated based on the given prompt. Please do not share any personal information.
                        
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Main;