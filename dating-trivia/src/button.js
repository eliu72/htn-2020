import React, {useState} from "react";

export const Button = (props) => {
    const [option, setOption] = useState("");

    // change option by pulling from db based on the current question
    const changeOption = () => {
        setOption("");
    };

    return (
        <div className="Option">
            <button>{props.option}</button>
        </div>
    )
}

export default Button;