import Number from "./Number";
const BoardGame = () => {
    var n = 100;
    var arr = [...Array(n).keys()];

    return (
        <div className="board-game">
            {
                arr.sort(() => 0.5 - Math.random()).map((item, i) => <Number key={i} value={item+1} />)
            }
        </div>
    );
}

export default BoardGame;