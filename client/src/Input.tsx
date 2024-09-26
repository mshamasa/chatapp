import { useRef } from "react";
import { useParams } from "react-router-dom";

import { useChannelsContext } from "./ChannelsContext";

function Input() {
  const { websocket } = useChannelsContext();
  const params = useParams<"channelId">();
  const channel_id = Number(params.channelId ?? 2);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = form.get("userInput");

    if (!text) {
      return;
    }

    websocket.send(
      JSON.stringify({ text, user_id: 1, channel_id, type: "send" })
    );
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <input
        autoComplete="off"
        name="userInput"
        type="text"
        placeholder="type stuff"
        ref={inputRef}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default Input;
