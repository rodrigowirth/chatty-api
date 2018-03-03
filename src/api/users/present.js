export default function (user) {
  return {
    ...user,
    id: user.id.toString(),
  };
}
