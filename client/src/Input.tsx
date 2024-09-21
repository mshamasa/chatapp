function Input({ userId, websocket }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = form.get("userInput");
    if (!text) {
      return;
    }

    websocket.send(JSON.stringify({ text, userId, channel: 1 }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userInput" type="text" placeholder="type stuff" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Input;
