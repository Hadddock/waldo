import React from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const url =
  import.meta.env.VITE_ENVIRONEMNT === "production"
    ? "http://localhost:3000"
    : "https://w-waldo-855c2f9cefa0.herokuapp.com";

function convertTime(time) {
  const ms = time;

  const totalSeconds = ms / 1000;
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(
    Math.floor((totalSeconds - hours * 3600) / 60)
  ).padStart(2, "0");
  const seconds = String(
    (totalSeconds - hours * 3600 - minutes * 60).toFixed(3)
  ).padStart(6, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export default function ScoreEntry() {
  const navigate = useNavigate();
  const { time } = useParams();
  if (isNaN(Number(time))) {
    navigate("/");
  }

  async function submitTime(name) {
    const response = await fetch(`${url}/score/` + name, {
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return false;
    }
    const responseJson = await response.json();
    return responseJson.currentRecord;
  }

  async function submitForm(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const submitTimeResult = await submitTime(name);
    if (submitTimeResult) {
      navigate("/highscores", { state: { currentResult: submitTimeResult } });
    }

    return;
  }
  return (
    <div>
      <div>Your Time: {convertTime(time)}</div>
      <form onSubmit={submitForm}>
        <label htmlFor="name">Enter your name:</label>
        <input
          placeholder="Your name here"
          id="name"
          name="name"
          type="text"
        ></input>
        <input type="submit">Submit</input>
      </form>
    </div>
  );
}
