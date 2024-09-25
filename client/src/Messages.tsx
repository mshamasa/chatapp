import { useChannelsContext } from "./ChannelsContext";

function Messages() {
  const { messages } = useChannelsContext();

  const rows = messages.map((item) => {
    return <div>{item.text}</div>;
  });

  return <section className="channel-messages">{rows}</section>;
}

export default Messages;
