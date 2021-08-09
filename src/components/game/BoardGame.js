import Number from "./Number";
import {baseWs, API, Routes} from "../../routes/CONSTANTS";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import userState from "../../recoil/atoms/userState";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useHistory } from 'react-router-dom'

const BoardGame = () => {
    const history = useHistory();
    const [gameInfo, setGameInfo] = useState(null);
    const [{username, roomId}, setUserState] = useRecoilState(userState);
    var sock = new SockJS(baseWs);
    let stompClient = Stomp.over(sock);

    useEffect(()=> {
        if (!username || !roomId) {
            history.push(Routes.ONBOARDING_PAGE);
        } else {
            stompClient.connect({}, function (frame) {
                stompClient.subscribe(`/topic/${roomId}`, function (message) {
                    let data = JSON.parse(message.body);
                    if (data.status === 0) {
                        setGameInfo(data.gameInfo);
                    } else {
                        if (!gameInfo) {
                            alert(data.message);
                            history.push(Routes.ONBOARDING_PAGE);
                        }
                    }
                });
                stompClient.send(`/app/game/join/${roomId}/${username}`, {}, "")
            })
        }
    }, [setGameInfo]);

    const numberClickHandler = (number) => {
        if (number === gameInfo.currentNumber + 1) {
            stompClient.send(`/app/game/play/${gameInfo.roomId}/${username}/${number}`, {}, "")
        }
    }

    const copyRoomIdHandler = () => {
        const el = document.createElement('textarea');
        el.value = roomId;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const readyPlayHandler = () => {
        stompClient.send(`/app/game/ready/${gameInfo.roomId}/${username}`, {}, "")
    }

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
                  stompClient.unsubscribe(`/topic/${roomId}`);
                  stompClient.disconnect();
              } else {
                  console.log(data);
              }
        }
        )
        .catch(error => console.log(error));
    }

    return gameInfo ? 
    (
            gameInfo.status=== 3 && gameInfo.metricNumber ? (
                <div className="board-game">
                    {
                        gameInfo.metricNumber.map((item, i) => <Number onClick={() => gameInfo.metricStatus[i] === 0 && numberClickHandler(item)} key={i} value={item} isCurrent={gameInfo.currentNumber === item} status={gameInfo.metricStatus[i]} />)
                    }
                </div>
            ) : (
                gameInfo.status=== 4 ? 
                (
                    <div className="form-onboard" style={{justifyContent: "left"}}>
                        <h1 style={{color:"brown"}}>Cuộc chiến đã kết thúc với phần thắng thuộc về {gameInfo.player1Point > gameInfo.player2Point ? gameInfo.player1 : gameInfo.player2} </h1>
                        <h1 style={{color:"brown"}}>Tổng điểm của bạn: {username === gameInfo.player1? gameInfo.player1Point : gameInfo.player2Point}</h1>
                        <h1 style={{color:"brown"}}>Tổng điểm của đối thủ: {username === gameInfo.player1? gameInfo.player2Point : gameInfo.player1Point}</h1>
                        <div className="btn-onboard" onClick={backGameHandler}><span>Quay về</span></div>
                    </div>
            ) :
                (<div className="form-onboard" style={{justifyContent: "left"}}>
                    <h1 style={{color:"brown"}}>Room ID: {gameInfo.roomId} </h1>
                    <h1 style={{color:"brown"}}>Player 1: {gameInfo.player1}</h1>
                    <h1 style={{color:"brown"}}>Player 2: {gameInfo.status === 0 ? <i style={{fontFamily:"monospace", fontSize:"xx-large", color:"slateblue"}}>[Waiting...]</i> : gameInfo.player2}</h1>
                    {gameInfo.status === 0 && <div className="btn-onboard" onClick={copyRoomIdHandler}><span>Copy Room ID</span></div>}
                    {gameInfo.status === 2 && <b>{(gameInfo.player1 === username ? gameInfo.player2Ready : gameInfo.player1Ready) ? "Đối thủ đã sẵn sàng, " : ""}Trận chiến sắp bắt đầu!</b>}
                    {gameInfo.status !== 0 && <div className="btn-onboard" onClick={readyPlayHandler}><span>{(gameInfo.player1 === username ? gameInfo.player1Ready : gameInfo.player2Ready) ? "Đợi xíu" : "Sẵn sàng"}</span></div>}
                </div>)
        )
    ) : (<div className="form-onboard"><p>Loading...</p></div>);
}

export default BoardGame;