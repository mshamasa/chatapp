import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type Message = {
  id: number;
  text: string;
  channel_id: number;
  user: {
    username: string;
    user_id: number;
  };
  type?: string;
};

type Messages = Array<Message>;

type Context = {
  websocket: WebSocket;
  messages: Messages;
};

const URL = "http://localhost:3000";

const socket = new WebSocket("ws://localhost:8080");

const Context = createContext<Context>({
  websocket: socket,
  messages: [],
});

const useChannelContext = () => {
  return useContext(Context);
};

const useData = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const params = useParams<"channelId">();
  const channelId = Number(params.channelId ?? 0);

  const addMessage = (event: WebSocketEventMap["message"]) => {
    if (typeof event.data === "string") {
      const message: Message = JSON.parse(event.data);
      if (message.channel_id === channelId && message.type === "send") {
        setMessages((prev) => {
          return [...prev, message];
        });
      }
    }
  };

  const data = async () => {
    const response = await fetch(`${URL}/channels/${channelId}`);
    const results: Messages = await response.json();
    setMessages(results);
  };

  useEffect(() => {
    if (!channelId) {
      return;
    }

    socket.addEventListener("message", addMessage);
    data();

    return () => {
      setMessages([]);
      socket.removeEventListener("message", addMessage);
    };
  }, [channelId]);

  return { messages, websocket: socket };
};

export { useChannelContext, useData, Context };
