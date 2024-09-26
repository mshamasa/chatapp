import { useNavigate } from "react-router-dom";
import { useChannelsContext } from "./ChannelsContext";
import { ChannelsProvider } from "./ChannelsProvider";

import Channel from "./Channel";

import "./Channels.css";

function Component() {
  const navigate = useNavigate();
  const { channels } = useChannelsContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id) {
      navigate(event.currentTarget.id);
    }
  };

  const rows = channels.map((item) => {
    return (
      <button
        className="channel"
        key={item.id}
        id={String(item.id)}
        onClick={handleClick}
      >
        {item.name}
      </button>
    );
  });

  return (
    <div className="channels-container">
      <div className="channels">{rows}</div>
      <Channel />
    </div>
  );
}

const Channels = () => {
  return (
    <ChannelsProvider>
      <Component />
    </ChannelsProvider>
  );
};

export default Channels;
