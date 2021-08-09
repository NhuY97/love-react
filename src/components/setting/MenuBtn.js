import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom'
import { API, Routes} from "../../routes/CONSTANTS";
import userState from "../../recoil/atoms/userState";

const MenuBtn = () => {
  const history = useHistory();
  const [{username}, setUserState] = useRecoilState(userState);

  const backGameHandler = () => {
    fetch(`${API.GAME_QUIT}?username=${username}`)
    .then(response => response.json())
    .then(data => {
          if(data.status === 0) {
            setUserState({
                username: username,
                roomId: "",
            })
              history.push(Routes.ONBOARDING_PAGE);
          } else {
              console.log(data);
          }
    }
    )
    .catch(error => console.log(error));
}

  return (
    <div
        className="btn"
        onClick={backGameHandler}
    >
        <FontAwesomeIcon className="icon" icon={faHome} />
    </div>
  );
};

export default MenuBtn;
