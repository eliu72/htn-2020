// import { Question } from "./question";
// import { Option } from "./option";
// import Container from "@material-ui/core/Container";

// function App() {
//   return (
//     <div>
//       <Container maxWidth="xs">
//         <Question question="Would you ever want to be famous?" />
//         <Option option="Of course" />
//         <Option option="Never" />
//         <Option option="It might be nice" />
//         <Option option="I used to want to" />
//       </Container>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import Card from './card';
import Timer from './timer';
let questionBank = require('./public/questions.json');

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  checkAnswer(answer, correctAnswer) {
    // this method checks if the correct answer was selected     
    //sup
  }

  // populateQuizCard = (record, index) => {
  //     const { correct_answer, incorrect_answers, question } = record;
  //     return (
  //         <Card
  //             key={index}
  //             checkAnswerFn={this.checkAnswer}
  //             question={atob(question)}
  //             correctAnswer={atob(correct_answer)}
  //             wrongAnswers={incorrect_answers.map(x => TextareaAutosize(x))}
  //         />
  //     );
  // };
//
  render () {
      const {
          quizData,
          rightAnswer,
          currentQuestion,
      } = this.props;

      return (
        
        <div>
          <Timer/>
          <div class = "timer"> 
            
          </div>
          
          
          {questionBank.map((currQuestion, key) => {
            return (
              <Card 
                question={currQuestion.question}
                a1={currQuestion.a1}
                a2={currQuestion.a2}
                a3={currQuestion.a3}
                a4={currQuestion.a4}
                correctAnswer={currQuestion.correct}
              />
            )
          })}
        </div>

      );
  }
}
