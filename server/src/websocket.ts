import { WebSocketServer, WebSocket } from "ws";
import { Sequelize } from "sequelize";

import { setupDatabase } from "./database";

let database: Sequelize;
(async () => {
  if (database) {
    return;
  }
  database = await setupDatabase();
})();

const wss = new WebSocketServer({ port: 8080 });

const updateState = async (data: string) => {
  const { models } = database;
  console.log("updateState start");
  try {
    const { text, userId, channelId, type } = JSON.parse(data);
    if (type === "send") {
      await models.messages.create({
        text,
        user_id: userId,
        channel_id: channelId,
      });
    }
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
