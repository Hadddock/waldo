import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Results() {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    async function retriveHighscores() {
      const response = await fetch(`http://localhost:3000/highscores`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
      }
      const responseJson = await response.json();
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
