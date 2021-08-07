import useSound from "use-sound";
import { useRecoilValue } from "recoil";
import backgroundSound from "../assets/sound/background.mp3";
import toggleSoundState from "../recoil/atoms/toggleSoundState";

export const Sound = {
  GAME_BACKGROUND: "GAME_BACKGROUND",
}

export default function usePlaySound(sound) {
  const { music } = useRecoilValue(toggleSoundState);
  const defaultConfigSound = {
    interrupt: true,
    volume: music,
  };
  let soundPath = backgroundSound;
  if (sound) {
    switch (sound) {
      case Sound.GAME_BACKGROUND:
        soundPath = backgroundSound;
        break;
      default:
        soundPath = backgroundSound;
        break;
    }
  }

  const [
    play,
    { sound: loadedSound, stop, pause },
  ] = useSound(soundPath, defaultConfigSound);

  return {
    play,
    loadedSound,
    stop,
    pause,
  };
}
