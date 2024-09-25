import { useChannelsContext } from "./ChannelsContext";

function Input() {
  const { websocket, channelId } = useChannelsContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = form.get("userInput");

    if (!text) {
      return;
    }

    websocket.send(
      JSON.stringify({ text, userId: 1, channelId, type: "send" })
    );
  };

  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <input name="userInput" type="text" placeholder="type stuff" />
      <button type="submit">Send</button>
    </form>
  );
}

export default Input;
