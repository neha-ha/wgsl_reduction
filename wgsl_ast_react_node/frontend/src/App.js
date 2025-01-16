import React, { useState } from "react";
// using axios to simplify POST & GET requests from backend and automatically handles JSON data
import axios from "axios";

// function to format the AST into a nore readable tree string
function formatASTString(astString) {
  let formatted = "";
  let indentLevel = 0;

  for (let i = 0; i < astString.length; i++) {
    const char = astString[i];

    if (char === "(") {
      // Increase indentation and move to a new line
      indentLevel++;
      formatted += "\n" + "  ".repeat(indentLevel);
    } else if (char === ")") {
      // Decrease indentation level
      indentLevel = Math.max(indentLevel - 1, 0);
    } else if (char === " " && astString[i - 1] === "(") {
      // Skip spaces immediately after opening parentheses
      continue;
    } else {
      // Add the character to the formatted result
      formatted += char;
    }
  }

  return formatted.trim();
}

function App() {
  // states-- react components all have built in state objects
  // when state object changes, component re-renders

  // usestate(initial value) returns current state and a function that updates the state
  // so in this, for example, wgslCode represents the current state and setWgslCode is the function that updates the state
  const [wgslCode, setWgslCode] = useState("");
  const [ast, setAst] = useState("");

  // async functions-- for tasks that don't finish immediately, like api calls

  // this function is triggered when the user submits the form via button press
  const handleSubmit = async (e) => {
    // prevernts default behaviour of form submission (which would refresh the page)
    e.preventDefault();

    try {
      // send wgsl code and wait for a response from the backend
      const response = await axios.post("http://localhost:5000/wgsl-to-ast", {
        code: wgslCode,
      });
      // change state of the ast textbox to show the returned ast
      //setAst(response.data.ast);
      const formatted = formatASTString(response.data.ast);
      setAst(formatted);
    } 
    catch (error) {
      console.error("Error parsing WGSL:", error);
      setAst("Error parsing WGSL code");
    }
  };

  // frontend components
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>WGSL AST Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={wgslCode}
          onChange={(e) => setWgslCode(e.target.value)}
          rows="10"
          cols="50"
          placeholder="Enter WGSL code here..."
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Generate AST
        </button>
      </form>
      <h2>Abstract Syntax Tree</h2>
        <textarea
        value={ast}
        readOnly
        rows="20"
        cols="50"
        style={{
          marginTop: "10px",
          width: "100%",
          backgroundColor: "#f4f4f4",
          border: "1px solid #ccc",
          padding: "10px",
          fontFamily: "monospace",
        }}
      />
    </div>
  );
}

export default App;

