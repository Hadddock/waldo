import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

const url =
  import.meta.env.VITE_ENVIRONEMNT === "production"
    ? "http://localhost:3000"
    : "https://w-waldo-855c2f9cefa0.herokuapp.com";

function Results() {
  const { state } = useLocation();
  let currentResult;
  if (state) {
    currentResult = state.currentResult;
  }

  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    async function retriveHighscores() {
      const response = await fetch(`${url}/highscores`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
      }

      console.log("HERE's THE CURRENT RESULT" + currentResult);

      const responseJson = await response.json();
      if (currentResult && !responseJson.scores.includes(currentResult)) {
        console.log("HEY THERE WAS SOMETHING PASSED IN");
        responseJson.scores.push(currentResult);
        responseJson.sort((a, b) => {
          if (a.time < b.time) {
            return -1;
          } else if (a.time > b.time) {
            return 1;
          }
          return 0;
        });
        responseJson.scores.pop();
      }
      setHighscores(responseJson.scores);
    }

    retriveHighscores();
  }, []);

  return (
    <h1>
      {highscores.map((highscore) => (
        <li key={uuidv4()}> {highscore.name + " " + highscore.time} </li>
      ))}
    </h1>
  );
}

export default Results;
