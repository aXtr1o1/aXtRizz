// src/components/Main/Main.jsx
import React from 'react'
import SideBar from '../SideBar/SideBar'
import Chatbot from '../Chatbot/Chatbot';
import './Main.css';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/context.jsx";
import {useContext} from "react";

const Main = () => {
    const { newChat, showChatbot } = useContext(Context);

    console.log({showChatbot}); // ADD THIS LINE

    return (
        <main className="main">
            <nav  className="nav">
                <p onClick={() => newChat()} id='title'>aXtRizz</p>
            </nav>
            <div className="main-container">
                {!showChatbot && (
                    <>
                        <div className="greet">
                            <p id='bold'><span>Learn Rizzonomics</span></p>
                            <p>Show and get rizzed !</p>
                        </div>
                        <div className="cards">
                            <div className="card"
                                 onClick={() => alert("Functionality to be implemented for card 1")}>
                                <p>Are you a patent? Because I'd like to explore your intellectual property.</p>
                                <img src={assets.compass_icon} alt=""/>
                            </div>

                            <div className="card"
                                 onClick={() => alert("Functionality to be implemented for card 2")}>
                                <p>Is your heart a manufacturing plant? Because it's producing some serious feelings for me.</p>
                                <img src={assets.bulb_icon} alt=""/>
                            </div>

                            <div className="card"
                                 onClick={() => alert("Functionality to be implemented for card 3")}>
                                <p>Do you work for the patent office? Because you've got 'fine' written all over you.</p>
                                <img src={assets.message_icon} alt=""/>
                            </div>

                            <div className="card" onClick={() => alert("Functionality to be implemented for card 4")}>
                                <p>Are you an HVAC system? Because you've got me feeling hot and bothered.</p>
                                <img src={assets.code_icon} alt=""/>
                            </div>
                        </div>
                    </>
                )}
                <Chatbot />
            </div>
        </main>
    )
}

export default Main