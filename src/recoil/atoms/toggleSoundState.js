import { atom } from "recoil";

const toggleSoundState = atom({
  key: "TOGGLE_SOUND",
  default: {
    music: 1,
    },
});

export default toggleSoundState;
