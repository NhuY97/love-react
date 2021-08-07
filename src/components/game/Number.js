
const Number = (props) => {

    return (
        <div className="number">
            <div>
                <span>{props.value.toString().padStart(2, "0")}</span>
            </div>
        </div>
    );
}

export default Number;