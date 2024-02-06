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

      const responseJson = await response.json();
      if (
        currentResult &&
        !responseJson.scores.some((score) => {
          return (
            score.name == currentResult.name && score.time == currentResult.time
          );
        })
      ) {
        responseJson.scores.push(currentResult);
        responseJson.scores.sort((a, b) => {
          if (a.time < b.time) {
            return -1;
          } else if (a.time > b.time) {
            return 1;
          }
          return 0;
        });
        if (responseJson.scores.length > 10) {
          responseJson.scores.pop();
        }
      }

      setHighscores(responseJson.scores);
    }

    retriveHighscores();
  }, []);

  return (
    <h1>
      <ol type="1" className="resultsList">
        {highscores.map((highscore) => (
          <li key={uuidv4()}> {highscore.name + " " + highscore.time} </li>
        ))}
      </ol>
    </h1>
  );
}

export default Results;
