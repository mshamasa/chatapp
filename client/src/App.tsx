import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Input from "./Input";
import Channel from "./Channel";

import "./App.css";

const socket = new WebSocket("ws://localhost:8080");
const userId = Math.floor(Math.random() * 100);

socket.addEventListener("open", () => {
  console.log("client connected");
});

export type Message = {
  userId: number;
  text: string;
};

function App() {
  const [state, setState] = useState<Array<Message>>([]);
  // Listen for messages
  socket.addEventListener("message", async (event) => {
    console.log("Message from server ", event.data);
    try {
      const data: Message = JSON.parse(event.data);
      setState([...state, data]);
    } catch {
      console.log("whatever", event.data);
    }
  });

  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <Channel messages={state} />
      <Input userId={userId} websocket={socket} />
    </div>
  );
}

export default App;
