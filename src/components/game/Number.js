
const Number = (props) => {
    const styleStt = {0: "available", 1: "player1", 2: "player2"};
    return (
        <div className="number" onClick={props.onClick}>
            <div className={styleStt[props.status]}>
                <span className={props.isCurrent ? "current" : ""}>{props.value.toString().padStart(2, "0")}</span>
            </div>
        </div>
    );
}

export default Number;