import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://bfhll.onrender.com/bfhl";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ["Alphabets", "Numbers", "Highest Alphabet"];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post(API_URL, parsedData);
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or API error");
    }
  };

  return (
    <div className="container" style={{ textAlign: "center", padding: "20px" }}>
      <h1>Bajaj Finserv Dev Challenge</h1>
      <textarea
        rows="5"
        placeholder='Enter JSON (e.g. { "data": ["A","1","B"] })'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        style={{ width: "80%", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleSubmit} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Submit
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {response && (
        <>
          <h2>Response</h2>
          <select
            multiple
            onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}
            style={{ marginBottom: "10px", padding: "5px" }}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div>
            {selectedOptions.includes("Alphabets") && <p><strong>Alphabets:</strong> {JSON.stringify(response.alphabets)}</p>}
            {selectedOptions.includes("Numbers") && <p><strong>Numbers:</strong> {JSON.stringify(response.numbers)}</p>}
            {selectedOptions.includes("Highest Alphabet") && <p><strong>Highest Alphabet:</strong> {JSON.stringify(response.highest_alphabet)}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
