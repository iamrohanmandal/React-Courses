import React, { useState } from "react";

export default function TextForm(props) {
  

  const handleUpClick = () => {
    console.log("Upper text was clicked");
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to upper case", "success");
  };

  const handleCopy = () => {
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Text Copied", "success");
    }
    

  const handleLoClick = () => {
    console.log("Lower text was clicked");
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lower case", "success");
  };
  const handleClear = () => {
    console.log("clear text was clicked");
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared", "success");
  };


  const handleOnChange = (event) => {
    console.log("On Change");
    setText(event.target.value);
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "))
    props.showAlert("Extra Space Cleared", "success");
    }
    

  const [text, setText] = useState("");
  return (
    <>
      <div className="container" style = {{color : props.mode==="dark"?"white":"black"}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            //   this throws an event object to the function
            style= {{backgroundColor : props.mode==="dark"?"white":"white"}}
            id="myBox"
            rows="8"
          ></textarea>
          <button disabled = {text.length===0}  className="btn btn-success my-1 mx-1" onClick={handleUpClick}>
            Convert to Upper Case
          </button>
          <button disabled = {text.length===0} className="btn btn-success my-1 mx-1" onClick={handleLoClick}>
            Convert to Lower Case
          </button>
          <button disabled = {text.length===0} className="btn btn-success my-1 mx-1" onClick={handleClear}>
            Clear Text
          </button>
          <button disabled = {text.length===0} className="btn btn-success my-1 mx-1" onClick={handleCopy}>
            Copy Text
          </button>
          <button disabled = {text.length===0} className= 'btn btn-success my-1  mx-1' onClick={handleExtraSpaces}>Remove extra spaces</button>
        </div>
        <div className="container my-2">
          <h1>Your Text summary</h1>
          <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
          <p>{0.008 *text.split(" ").filter((element)=>{return element.length!==0}).length } Minutes to read</p>
          <h2>Preview</h2>
          <p>{text.length>0?text:"Write something on the text box above to preview it here"}</p>
        </div>
      </div>
    </>
  );
}
