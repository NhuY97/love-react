import { atom } from "recoil";

const userState = atom({
  key: "USER_STATE",
  default: {
    username: null,
    roomId: null,
  },
});

export default userState;