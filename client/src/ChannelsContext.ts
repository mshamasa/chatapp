import { createContext, useContext, useState, useEffect } from "react";

type Channel = {
  id: number;
  name: string;
  description: string;
};

type Message = {
  id: number;
  text: string;
  user: {
    username: string;
    userId: number;
  };
};

type Messages = Array<Message>;

type Channels = Array<Channel>;

type Context = {
  channels: Channels;
  channelId: number | null;
  setChannelId: (id: number) => void;
  websocket: WebSocket;
  messages: Messages;
};

const URL = "http://localhost:3000";

const socket = new WebSocket("ws://localhost:8080");

const ChannelsContext = createContext<Context>({
  channels: [],
  channelId: null,
  setChannelId: (id) => {
    return id;
  },
  websocket: socket,
  messages: [],
});

const useChannelsContext = () => {
  return useContext(ChannelsContext);
};

const useChannel = () => {
  const [channelId, setChannelId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Messages>([]);

  const data = async () => {
    const response = await fetch(`${URL}/channels/${channelId}`);
    const results: Messages = await response.json();
    console.log("messages", results);
    setMessages(results);
  };

  useEffect(() => {
    if (!channelId) {
      return;
    }

    socket.send(JSON.stringify({ channelId, type: "register" }));
    data();

    return () => {
      setChannelId(null);
      setMessages([]);
    };
  }, [channelId]);

  return { channelId, setChannelId, messages };
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
