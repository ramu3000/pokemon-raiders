const usernameKey = "username";
const userIdKey = "uid";

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const handleUserId = () => {
  if (localStorage.getItem(userIdKey)) {
    return localStorage.getItem("uid");
  } else {
    const randomId = getRandomInt(99999).toString();
    localStorage.setItem("uid", randomId);
    return randomId;
  }
};

export const getUserChatName = () => {
  if (localStorage.getItem(usernameKey)) {
    return localStorage.getItem(usernameKey);
  } else {
    const randomId = getRandomInt(99999).toString();
    localStorage.setItem(usernameKey, `Ano-${randomId}`);
    return `Ano-${randomId}`;
  }
};

export const setUserChatName = user => {
  try {
    localStorage.setItem(usernameKey, user);
    return user;
  } catch {
    console.error("User not saved in localstorage");
    return false;
  }
};
