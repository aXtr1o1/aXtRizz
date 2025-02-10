// src/components/Main/Main.jsx
import React from 'react'
import SideBar from '../SideBar/SideBar'
import Chatbot from '../Chatbot/Chatbot';
import './Main.css';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/context.jsx";
import {useContext} from "react";

const Main = () => {
const { newChat, showChatbot, setInput } = useContext(Context); // ADD setInput from context

console.log({showChatbot});

// Function to handle card click and copy text to input
const handleCardClick = (text) => {
setInput(text); // Use setInput from context to update Chatbot's input
};

    return (
      <main className="main">
        <nav className="nav">
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
                  onClick={() => handleCardClick("Are you a patent? Because I'd like to explore your intellectual property.")} // Call handleCardClick
                >
                  <p>Are you a patent? Because I'd like to explore your intellectual property.</p>
                  <img src={assets.compass_icon} alt=""/>
                </div>

                <div className="card"
                  onClick={() => handleCardClick("Is your heart a manufacturing plant? Because it's producing some serious feelings for me.")} // Call handleCardClick
                >
                  <p>Is your heart a manufacturing plant? Because it's producing some serious feelings for me.</p>
                  <img src={assets.bulb_icon} alt=""/>
                </div>

                <div className="card"
                  onClick={() => handleCardClick("Do you work for the patent office? Because you've got 'fine' written all over you.")} // Call handleCardClick
                >
                  <p>Do you work for the patent office? Because you've got 'fine' written all over you.</p>
                  <img src={assets.message_icon} alt=""/>
                </div>

                <div className="card"
                  onClick={() => handleCardClick("Are you an HVAC system? Because you've got me feeling hot and bothered.")} // Call handleCardClick
                >
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