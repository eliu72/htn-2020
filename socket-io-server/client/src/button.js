import React, {useState} from "react";
import { useCallback } from 'react'

export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])
    return update;
} 

export const Button = (props) => {
    const [option, setOption] = useState("");
    const [clicked, setClicked] = useState(false);
    const forceUpdate = useForceUpdate();

    // change option by pulling from db based on the current question
    const changeOption = () => {
        setOption("");
    };

    const handleClick = () => {
        setClicked(!clicked);
        console.log(clicked);
        forceUpdate();
    }

    return (
        <div className="Option">
            <button className={props.clicked ? "buttonTrue": "buttonFalse"} onClick={handleClick}>
                {props.option}
            </button>
        </div>
    )
}

export default Button;