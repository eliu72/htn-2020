import React from "react";
import { Button } from "./button";

export default class Card extends React.Component {
    constructor( props ){
        super(props);
       
    }
   
  
    render (){
        
        const {
            question,
            correctAnswer,
            a1,
            a2,
            a3,
            a4,
        } = this.props;
        
        // array of answers
        const answers = [a1].concat(a2).concat(a3).concat(a4);
        
        return (
            <article className="card">
                <div class="questions">
                <div>
                    <h1>{question}</h1>
                </div>
                <footer>
                    {answers.map((answer, i) => {
                        return (
                        <Button key={i}
                            option={answer}
                        >
                            
                        </Button>
                        );
                    })}
                </footer>
                </div>
            </article>
        )
    }
}