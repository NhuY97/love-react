import { useRecoilState } from "recoil";
import toggleSoundState from "../../recoil/atoms/toggleSoundState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const ToggleMusic = () => {
  const [{music}, toggleSound] = useRecoilState(toggleSoundState);
  return (
    <div
        className="btn"
        onClick={() => {
        toggleSound((prevValue) => ({
          ...prevValue,
          music: prevValue.music === 1 ? 0 : 1,
        }));
      }}
    >
        <FontAwesomeIcon className="icon" icon={music ? faVolumeUp : faVolumeMute} />
    </div>
  );
};

export default ToggleMusic;
