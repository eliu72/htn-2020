  
import React, {useState} from "react";
import { Button } from "./button";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { socket } from "./socketHeader";
import { Header } from './socketHeader';
import { makeStyles } from '@material-ui/core/styles';


export const Card = (props) => {

    const [question, setQuestion] = useState("");
    const [a1, setA1] = useState("");
    const [a2, setA2] = useState("");
    const [a3, setA3] = useState("");
    const [a4, setA4] = useState("");

    const changeQuestion = () => {
        setQuestion("");
    };
    const changeA1 = () => {
        setA1("");
    };
    const changeA2 = () => {
        setA2("");
    };
    const changeA3 = () => {
        setA3("");
    };
    const changeA4 = () => {
        setA4("");
    };
    // const {
    //     question,
    //     correctAnswer,
    //     a1,
    //     a2,
    //     a3,
    //     a4,
    //     answer
    // } = this.props;
    
    // array of answers
    const answers = [props.a1].concat(props.a2).concat(props.a3).concat(props.a4);

    const [selectedAnswer, setSelectedAnswer] = React.useState('');

    const emitResponse = (event, newAnswer) => {
        setSelectedAnswer(newAnswer);
        console.log(newAnswer);
        socket.emit('answer', [{sender: socket.id, question: props.question, answer: newAnswer}]);
        return;
    }

    return (
        <article className="card">
            <Header/>
            <div class="questions">
                <div>
                    <h1>{props.question}</h1>
                </div>
                <ToggleButtonGroup classes={{ root: 'ToggleButton' }}
                    value={selectedAnswer}
                    exclusive={true}
                    onChange={emitResponse}
                    aria-label="questions"
                    orientation="vertical"
                    type="radio"
                >
                    
                    {answers.map((answer, i) => {
                        return (
                            <ToggleButton  value={answer} aria-label={answer}>
                                {answer}
                            </ToggleButton>
                        // <Button key={i}
                        //     option={answer}
                        //     question={question}
                        // >
                            
                        // </Button>
                        );
                    })}

                </ToggleButtonGroup>
            </div>
        </article>
    )
}


export default Card;