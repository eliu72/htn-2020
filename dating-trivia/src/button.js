import React, {useState} from "react";
import { useCallback } from 'react'
import { socket } from "./socketHeader";
import { Header } from './socketHeader';


export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])
    return update;
} 

export const Button = (props) => {
    const [option, setOption] = useState("");
    const [question, setQuestion] = useState("");
    const [clicked, setClicked] = useState(false);
    const forceUpdate = useForceUpdate();

    // change option by pulling from db based on the current question
    const changeOption = () => {
        setOption("");
    };

    // change option by pulling from db based on the current question
    const changeQuestion = () => {
        setQuestion("");
    };

    const handleClick = () => {
        setClicked(!clicked);
        console.log(props.question);
        console.log(props.option);
        socket.emit('answer', [{sender: socket.id, question: props.question, answer: props.option}]);

        forceUpdate();
    }

    return (
        <div className="Option">
            <Header/>
            <button className={props.clicked ? "buttonTrue": "buttonFalse"} onClick={handleClick}>
                {props.option}
            </button>
        </div>
    )
}

export default Button;