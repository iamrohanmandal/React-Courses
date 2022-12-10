import React, { useState } from "react";

import "./App.css";
import Navbar from "./Components2/Navbar";
import TextForm from "./Components2/TextForm";
import About from "./Components2/About";
import Alert from "./Components2/Alert";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

function App2() {
  const [mode, setMode] = useState("light"); //whether  mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
      setTimeout(() => {
        setAlert(null);
      }, 2000);
  };
  const removeBodyClasses=()=>{
    document.body.classList.remove("bg-light")
    document.body.classList.remove("bg-dark")
    document.body.classList.remove("bg-warning")
    document.body.classList.remove("bg-danger")
    document.body.classList.remove("bg-success")
    
  }
  const toggleMode = (cls) => {
    removeBodyClasses();
    document.body.classList.add("bg-"+ cls)
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("dark mode has been enabled", "success");
      // document.title = "TextUtils-DarkMode"
      // setInterval(() => {
      //   document.title = "TextUtils-DarkMode"
      // }, 2000);
      // setInterval(() => {
      //   document.title = "install TextUtils now"
      // }, 1500);
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("light mode has been enabled", "success");
      // document.title = "TextUtils-LightMode"
    }
  };

  return (
    <>
    <Router>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-3">
      <Switch>
          <Route exact path="/about">
            <About />
          </Route>
         
          <Route exact path="/">
        <TextForm heading="Enter your text to Analyse" mode={mode} showAlert = {showAlert}/>
            
          </Route>
        </Switch>
        
      </div>
      </Router>
    </>
  );
}
export default App2;
