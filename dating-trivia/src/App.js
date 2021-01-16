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
import Button from './button';
import Timer from './timer';
let questionBank = require('./public/questions.json');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    
    this.state = {
      arr: [],
      currQuestion: 0,
      gameStart: true
    }
  }

  checkAnswer(answer, correctAnswer) {
    // this method checks if the correct answer was selected     
    //sup
  }

  populateQuizCard = (record) => {
      return (
        <Card 
          question={record.question}
          a1={record.a1}
          a2={record.a2}
          a3={record.a3}
          a4={record.a4}
          correctAnswer={record.correct}
        />
      );
  };

  jsonToArr(arr){
    Object.keys(questionBank).forEach(function (key) {
      arr.push(questionBank[key]);
    });
  }

  handleClick = () => {
    this.setState(prevState => {
      console.log(this.state.currQuestion);
       return {currQuestion: prevState.currQuestion + 1}
    })
    this.forceUpdate();
  }

  render () {
      const {
          quizData,
          rightAnswer,
      } = this.props;

      return (
        
        <div>
          <Timer/>
          <div class = "timer"></div>
          {this.jsonToArr(this.state.arr)}
          {this.state.gameStart ? (this.populateQuizCard(this.state.arr[this.state.currQuestion])) : (console.log("Exit"))}
          <button onClick={this.handleClick}>Next Question</button>
        </div>
      );
  }
}
