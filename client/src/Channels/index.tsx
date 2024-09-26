import { NavLink } from "react-router-dom";
import { useChannelsContext } from "./Context";
import { ChannelsProvider } from "./Provider";

import "./Channels.css";

function Component() {
  const { channels } = useChannelsContext();

  const rows = channels.map((item) => {
    return (
      <NavLink className="channel" key={item.id} to={`/channels/${item.id}`}>
        {item.name}
      </NavLink>
    );
  });

  return <div className="channels">{rows}</div>;
}

const Channels = () => {
  return (
    <ChannelsProvider>
      <Component />
    </ChannelsProvider>
  );
};

export default Channels;
