import ToggleMusic from "./ToggleMusic";
import ToggleBgSound from "./ToggleBgSound";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";

const SettingContainer = () => {
    const [toggleDisplay, setToggleDisplay] = useState(false);

    const angleDoubleRightClickHandler = () => {
        setToggleDisplay(!toggleDisplay);
    }
    
    useEffect(() => {

    }, [toggleDisplay]);

    return (
        <div className={`setting-container ${toggleDisplay ? "show" : "hidden"}`}>
            <div className="icon-fixed" onClick={angleDoubleRightClickHandler}>
            <FontAwesomeIcon icon={toggleDisplay ? faAngleDoubleRight : faAngleDoubleLeft} />
            </div>
            <ToggleMusic />
            <ToggleBgSound />
        </div>
    )
};

export default SettingContainer;