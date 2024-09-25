import { useChannelsContext } from "./ChannelsContext";

import Channel from "./Channel";

import "./Channels.css";

function Channels() {
  const { channels, setChannelId } = useChannelsContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id) {
      setChannelId(Number(event.currentTarget.id));
    }
  };

  const rows = channels.map((item) => {
    return (
      <button className="channel" id={String(item.id)} onClick={handleClick}>
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

export default Channels;
