import type { Message } from "./App";

import "./Channel.css";

function Channel({ messages }: { messages: Array<Message> }) {
  const rows = messages.map((item) => {
    return (
      <div className="message">
        <div>{item.text}</div>
        <div>{`User: ${item.userId}`}</div>
      </div>
    );
  });

  return <div className="channel">{rows}</div>;
}

export default Channel;
