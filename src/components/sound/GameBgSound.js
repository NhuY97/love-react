import { memo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const GameBgSound = () => {
  const {
    play: playBgSound,
    pause: pauseBgSound,
    loadedSound,
  } = usePlaySound(Sound.GAME_BACKGROUND);
  const setSounds = useSetRecoilState(gameSoundState);

  useEffect(() => {
    if (loadedSound !== null) {
      loadedSound.loop(true);
      setSounds((sounds) => ({
        ...sounds,
        soundReady: true,
        playBgSound,
        pauseBgSound,
        seek: loadedSound.seek,
      }));
    }
  }, [loadedSound, playBgSound, pauseBgSound, setSounds]);

  return null;
};

function areLoaded() {
  return true;
}

export default memo(GameBgSound, areLoaded);
