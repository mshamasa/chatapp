import { useChannelContext } from "./Context";

function Messages() {
  const { messages } = useChannelContext();

  const rows = messages.map((item) => {
    return <div key={item.id}>{item.text}</div>;
  });

  return <section className="channel-messages">{rows}</section>;
}

export default Messages;
