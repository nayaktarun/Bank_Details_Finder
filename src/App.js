import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [ifsc, setIfsc] = useState("");
  const [bank, setBank] = useState({});
  const [error, setError] = useState("");

  const SearchBank = (e) => {
    e.preventDefault();

    axios
      .get(`https://ifsc.razorpay.com/${ifsc}`)
      .then((res) => {
        console.log(res.data);
        setBank(res.data);
        setError("");
      })
      .catch((err) => {
        console.log(err.message);
        setBank({});
        setError(`error ${err.message}`);
      });
  };

  return (
    <div className="App">
      <h1>Bank Details Finder</h1>
      <input
        type="text"
        placeholder="Enter IFSC code"
        onChange={(e) => setIfsc(e.target.value)}
        value={ifsc}
      />
      <button onClick={SearchBank}>Find</button>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          {Object.keys(bank).length !== 0 && (
            <div className="table-div">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Bank Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{bank.BANK}</td>
                  </tr>
                  <tr>
                    <td>Branch</td>
                    <td>{bank.BRANCH}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{bank.ADDRESS}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{bank.CITY}</td>
                  </tr>
                  <tr>
                    <td>District</td>
                    <td>{bank.DISTRICT}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{bank.STATE}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
