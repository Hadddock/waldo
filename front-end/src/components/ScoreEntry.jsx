import React from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
export default function ScoreEntry() {
  const navigate = useNavigate();
  const { time } = useParams();

  async function submitTime(name) {
    const response = await fetch(`http://localhost:3000/highscores/` + name, {
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
    console.log(responseJson.wow);
    return true;
  }

  function submitForm(e) {
    e.preventDefault();
    const name = e.target[0].value;
    submitTime(name);

    if (submitTime(name)) {
      navigate("/highscores");
    }

    return;
  }
  return (
    <div style={{ marginTop: "80px  " }}>
      <div>{time}</div>
      <form onSubmit={submitForm}>
        <input id="name" name="name" type="text"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}
