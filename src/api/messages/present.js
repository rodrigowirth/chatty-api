function detail(message) {
  return {
    ...message,
    id: message.id.toString(),
    from: message.from.toString(),
    to: message.to.toString(),
  };
}

function list(messages) {
  return {
    messages: messages.map(detail),
  };
}

export default function (data) {
  return Array.isArray(data) ? list(data) : detail(data);
}
