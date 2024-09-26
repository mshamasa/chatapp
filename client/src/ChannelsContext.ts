import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type Channel = {
  id: number;
  name: string;
  description: string;
};

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

type Channels = Array<Channel>;

type Context = {
  channels: Channels;
  websocket: WebSocket;
  messages: Messages;
};

const URL = "http://localhost:3000";

const socket = new WebSocket("ws://localhost:8080");

const ChannelsContext = createContext<Context>({
  channels: [],
  websocket: socket,
  messages: [],
});

const useChannelsContext = () => {
  return useContext(ChannelsContext);
};

const useChannel = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const params = useParams<"channelId">();
  const channelId = Number(params.channelId ?? 0);

  const addMessage = (event: WebSocketEventMap["message"]) => {
    if (typeof event.data === "string") {
      const message: Message = JSON.parse(event.data);
      if (message.channel_id === channelId && message.type === "send") {
        setMessages([...messages, message]);
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
      console.log("clean up=====");
    };
  }, [channelId]);

  return { messages };
};

const useData = () => {
  const [channels, setChannels] = useState<Channels>([]);
  const channel = useChannel();

  const data = async () => {
    const response = await fetch(`${URL}/channels`);
    const results: Channels = await response.json();
    setChannels(results);
  };

  const IDs = channels.map((item) => item.id).join("");
  useEffect(() => {
    data();
  }, [IDs]);

  return { channels, websocket: socket, ...channel };
};

export { useData, useChannelsContext, ChannelsContext, useChannel };
