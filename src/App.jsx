import React from 'react'
import Main from './components/Main/Main'
import { useEffect } from "react";
import { initGA, trackPageView } from "./analytics";

const App = () => {
  useEffect(() => {
    initGA();
    trackPageView();
}, []);
  return (
    <>
    {/* <SideBar /> */}
    <Main />
    </>
  )
}

export default App