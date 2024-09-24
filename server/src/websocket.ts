import { WebSocketServer, WebSocket } from "ws";

const state = new Map();

const wss = new WebSocketServer({ port: 8080 });

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

console.info("websocket server up on ws://localhost:8080");
