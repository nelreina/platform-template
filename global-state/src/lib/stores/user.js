import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";

const USER_CTX = "user";

export const setUserState = (state) => {
  const userState = writable(state);
  setContext(USER_CTX, userState);
  return userState;
};

export const getUserState = () => {
  return getContext(USER_CTX);
};
