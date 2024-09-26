import { createContext, useContext, useState, useEffect } from "react";

type Channel = {
  id: number;
  name: string;
  description: string;
};

type Channels = Array<Channel>;

type Context = {
  channels: Channels;
};

const URL = "http://localhost:3000";

const ChannelsContext = createContext<Context>({
  channels: [],
});

const useChannelsContext = () => {
  return useContext(ChannelsContext);
};

const useData = () => {
  const [channels, setChannels] = useState<Channels>([]);

  const data = async () => {
    const response = await fetch(`${URL}/channels`);
    const results: Channels = await response.json();
    setChannels(results);
  };

  const IDs = channels.map((item) => item.id).join("");
  useEffect(() => {
    data();
  }, [IDs]);

  return { channels };
};

export { useData, useChannelsContext, ChannelsContext };
