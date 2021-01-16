import React, {useState} from "react"

export const Question = (props) => {
    const [question, setQuestion] = useState("");

    // change quesiton by pulling from db
    const changeQuestion = () => {
        setQuestion("");
    };

    return (
        <div className="Question">
            <h1>{props.question}</h1>
        </div>
    )
}