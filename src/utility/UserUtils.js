function isNullorUndefined(value) {
  return value === null || value === undefined;
}
// create a function isConnected taking a user as parameter returning true if the user is not null or undefined and if name parameter is not null or undefined
// and is not an empty string
export function isConnected(user) {
  return (
    !isNullorUndefined(user) &&
    !isNullorUndefined(user.username) &&
    user.username !== ""
  );
}
