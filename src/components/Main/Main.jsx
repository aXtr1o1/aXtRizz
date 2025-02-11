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
          <p onClick={() => newChat()} className='baskervville-regular' id='title'>aXtRizz</p>
          <a href="https://axtr.in">
          <img src="src/assets/whiteFG.png" alt="" className='image'/>
          </a>
        </nav>
        <div className="main-container">
          {!showChatbot && (
            <>
              <div className="greet">
                <p className='meow-script-regular sng'>Show and Get </p><p className='meow-script-regular rizz'>Rizzed !</p>
                <p id='bold' className='sixtyfour-convergence-A'><span>RIZZANOMICS</span></p>
              </div>
            </>
          )}
          <Chatbot />
        </div>
      </main>
    )
}

export default Main