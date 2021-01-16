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
import { Header } from './socketHeader';
import { socket } from "./socketHeader";
let questionBank = require('./public/questions.json');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    
    this.state = {
      arr: [],
      currQuestion: 0,
      gameStart: true,
      loading:false
    }
  }

  getCurrQuestion = (currQuestion) => {
    this.setState({ currQuestion: currQuestion })
  }

  componentDidMount() {
    socket.emit('heyheyhey', "what's up");
    socket.on("getCurrQuestion", this.getCurrQuestion);
  }

  componentWillUnmount() {
    socket.off("getCurrQuestion", this.getCurrQuestion);
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

  componentDidMount() {
    this.stuff()
  }

  stuff(){
    setTimeout(() => {
      this.setState({
        loading: true
      });
      this.forceUpdate();
      setTimeout(() => {
        this.setState({
          loading: false
        });
        this.setState(prevState => {
          this.stuff()
          console.log(this.state.currQuestion);
           return {currQuestion: prevState.currQuestion + 1}
        })
        this.forceUpdate();
      }, 2000)
    }, 10000)

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {

    if (this.state.loading)
        return (
            <div className="transition-screen"> 
            <h1>transition</h1>
            </div>
        );
      const {
          quizData,
          rightAnswer,
      } = this.props;

      return (
        
        <div>
          <Header/>
          <Timer/>
          <div className = "timer"></div>
          {this.jsonToArr(this.state.arr)}
          {this.state.gameStart ? (this.populateQuizCard(this.state.arr[this.state.currQuestion])) : (console.log("Exit"))}
        </div>
      );
  }
}
