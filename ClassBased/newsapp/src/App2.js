// import './App2.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import React, { useState } from 'react'
import NavBar from './components2/NavBar';
import News from './components2/News';
import LoadingBar from 'react-top-loading-bar'
const App2 = ()=> {
 const pageSize = 5;
 const apiKey = "2942d87dbb2840149ada3f95bb0b66a1"
const [progress, setProgress] = useState(0)
  // state = {
  //   progress: 0
  // }
  
  
    return (
      <div>
        <Router>
       <NavBar />
       <LoadingBar
       height = {3}
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
     
      <Switch>
          <Route exact path="/"><News setProgress={setProgress} apiKey = {apiKey}  key = "general" pageSize ={pageSize} country = "in" category = "general"/></Route>
          <Route exact path="/business"><News setProgress={setProgress} apiKey = {apiKey}  key = "business" pageSize ={pageSize} country = "in" category = "business"/></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey = {apiKey}  key = "entertainment" pageSize ={pageSize} country = "in" category = "entertainment"/></Route>
          <Route exact path="/general"><News setProgress={setProgress} apiKey = {apiKey}  key = "general" pageSize ={pageSize} country = "in" category = "general"/></Route>
          <Route exact path="/health"><News setProgress={setProgress} apiKey = {apiKey}  key = "health" pageSize ={pageSize} country = "in" category = "health"/></Route>
          <Route exact path="/science"><News setProgress={setProgress} apiKey = {apiKey}  key = "science" pageSize ={pageSize} country = "in" category = "science"/></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apiKey = {apiKey}  key = "sports" pageSize ={pageSize} country = "in" category = "sports"/></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apiKey = {apiKey}  key = "technology" pageSize ={pageSize} country = "in" category = "technology"/></Route>
          
        </Switch>
      </Router>
      </div>
    )
  
}
export default App2;
