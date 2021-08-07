import { atom } from "recoil";

const gameSoundState = atom({
  key: "GAME_SOUND_STATE",
  default: {
    soundReady: false,
    playBgSound: undefined,
    pauseBgSound: undefined,
  },
});

export default gameSoundState;
