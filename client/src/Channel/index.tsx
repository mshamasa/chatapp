import Messages from "./Messages";
import Input from "./Input";

import ChannelProvider from "./Provider";

import "./Channel.css";

function Comp() {
  return (
    <div className="channel">
      <Messages />
      <Input />
    </div>
  );
}

const Channel = () => {
  return (
    <ChannelProvider>
      <Comp />
    </ChannelProvider>
  );
};

export default Channel;
