import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const state = new Map();

const wss = new WebSocketServer({ port: 8080 });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const updateState = (data: string) => {
  console.log("updateState start");
  try {
    const { text, userId, channel } = JSON.parse(data);
    const res = state.get(channel) ?? [];
    res.push({ text, userId });
    state.set(channel, res);
    console.log(state);
  } catch (err) {
    console.log(err);
  }
  console.log("updateState done");
};

wss.on("connection", function connection(ws) {
  console.log("server connected");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    updateState(data.toString());
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});

app.listen(3000);
console.log("server up on http://localhost:3000");
