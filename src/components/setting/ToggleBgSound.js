import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import gameSoundState from "../../recoil/atoms/gameSoundState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ToggleBgSound = () => {
  const [isBgPlaying, setBgPlaying] = useState(false);
  const [{soundReady, pauseBgSound, playBgSound}] = useRecoilState(gameSoundState);
  useEffect(() => {
    if(soundReady) {
      playBgSound();
      setBgPlaying(true);
    }
  }, [soundReady, playBgSound]);

  return soundReady ? (
    <div
    className={`btn ${isBgPlaying ? 'pause' : 'play'}`}
      onClick={() => {
        if (isBgPlaying) {
          pauseBgSound();
          setBgPlaying(false);
        } else {
          playBgSound();
          setBgPlaying(true);
        }
      }}
    >
      <span className="bar bar-1"></span>
		  <span className="bar bar-2"></span>	
    </div>
  ) : <div className="btn"><FontAwesomeIcon className="icon" icon={faSpinner} /></div>;
};

export default ToggleBgSound;
