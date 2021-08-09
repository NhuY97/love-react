import { useState, useEffect, useRef } from "react";
import {API, Routes} from "../routes/CONSTANTS";
import userState from "../recoil/atoms/userState";
import { useRecoilState } from "recoil";
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom'

const OnboardingPage = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const usernameInput = useRef("");
    const [serverStatus, setServerStatus] = useState(true);
    const [usernameError, setUsernameError] = useState("");
    const [{username, roomId}, setUserState] = useRecoilState(userState);
    const history = useHistory();

    useEffect(() => {
        fetch(API.HEALTH_CHECK)
          .then(response => response.json())
          .then(data =>
            setServerStatus(data.status === 0)
          )
          .catch(error => setServerStatus(false));

          fetch(`${API.USER_VERIFY}?username=${cookies.username}`)
          .then(response => response.json())
          .then(data => {
                if(data.status === 0 && data.userInfo) {
                    setUserState({
                        username: data.userInfo.username,
                        roomId: data.userInfo.roomId,
                    })
                } else {
                    setUserState({
                        username: null,
                        roomId: null,
                    })
                }
          }
          )
          .catch(error => console.log(error));

    }, [setUserState, cookies.username]);

    const userNameSubmitHandler = () => {
        if (usernameInput.current.value && usernameInput.current.value.trim()) {
            fetch(`${API.USER_CREATE}?username=${usernameInput.current.value}`)
                .then(response => response.json())
                .then(data => {
                    if(data.status === 0 && data.userInfo) {
                        setUserState({
                            username: data.userInfo.username,
                            roomId: data.userInfo.roomId,
                        });
                        setCookie("username", data.userInfo.username, { path: '/' });
                    } else {
                        setUsernameError(data.message);
                        usernameInput.current.focus();
                    }
                }
                )
                .catch(error => console.log(error));    
        } else {
            setUsernameError("Chưa nhập tên kìa, chắc kí đầu quá!");
            usernameInput.current.value = "";
            usernameInput.current.focus();
        }
    };

    const joinRoomHandler = () => {
        var roomIdInput = prompt("Nhập mã phòng", "");
        if (roomIdInput) {
            setUserState({
                username: username,
                roomId: roomIdInput,
            });
            history.push(Routes.PLAY_GAME_PAGE.replace(":roomId", roomIdInput));
        }
    }

    const createRoomHandler = () => {
        fetch(`${API.GAME_CREATE}?username=${username}`)
        .then(response => response.json())
        .then(data => {
              if(data.status === 0 && data.roomId) {
                setUserState({
                    username: username,
                    roomId: data.roomId,
                });
                history.push(Routes.PLAY_GAME_PAGE.replace(":roomId", data.roomId));
              } else if(data.status === 404) {
                  setUserState({
                      username: null,
                      roomId: null,
                  });
              } else {
                  alert(data.message);
              }
        }
        )
        .catch(error => console.log(error));
    };

    const removeUserHandler = () => {
        fetch(`${API.USER_REMOVE}?username=${username}`)
        .then(response => response.json())
        .then(data => {
              if(data.status === 0) {
                  setUserState({
                      username: null,
                      roomId: null,
                  });
                  setCookie("username", null, { path: '/' });
              } else {
                  setUserState({
                      username: null,
                      roomId: null,
                  })
              }
        }
        )
        .catch(error => console.log(error));
    }

    const header = username ? (<p className="title">Vào chiến thôi nào {username}!</p>) : 
    (<>
        <input maxLength="20" autoFocus ref={usernameInput} className="user-name" type="text" placeholder="Nhập tên của bé vào đây!" />
        <span style={{marginTop: 5, color: "blue"}}>{usernameError}</span>
        <div className="btn-onboard" onClick={userNameSubmitHandler}><span>Go!</span></div>
    </>
    );

    const menu = username ? (
        <>
        {/* should create a btn component */}
        <div className="btn-onboard"><span>Ghép nhanh</span></div>
        <div className="btn-onboard" onClick={createRoomHandler}><span>Tạo phòng</span></div>
        <div className="btn-onboard" onClick={joinRoomHandler}><span>Vào phòng</span></div>
        <div className="btn-onboard"><span>Hướng dẫn</span></div>
        <div className="btn-onboard" onClick={removeUserHandler}><span>Reset</span></div>
        </>
    ) : (
        <>
        <div className="btn-onboard"><span>Hướng dẫn</span></div>
        </>
    );

    return serverStatus ? (
        <div className="form-onboard">
            {
                username && roomId &&
                    history.push(Routes.PLAY_GAME_PAGE.replace(":roomId", roomId))
            }
        	{header}
            {menu}
        </div>
    ) : (<div className="form-onboard"><p>Xin lỗi, hệ thống đang trong thời gian bảo trì,<br />Vui lòng thử lại sau!</p></div>);
}

export default OnboardingPage;