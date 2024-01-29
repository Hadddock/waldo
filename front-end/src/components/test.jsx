import React, { useEffect, useState } from "react";
function Test() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3000/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      console.log(response);
      const records = await response.json();

      setMessage(records.foo);
      return;
    }
    getRecords();
    return;
  }, []);
  return <h1>{message}</h1>;
}

export default Test;
