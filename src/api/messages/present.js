export default function (message) {
  return {
    ...message,
    id: message.id.toString(),
    from: message.from.toString(),
    to: message.to.toString(),
  };
}
