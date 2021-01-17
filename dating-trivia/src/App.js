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
import Formj from './form'; 
let questionBank = require('./public/questions.json');


export default class App extends React.Component {

  constructor(props) {
    super(props);
  this.beginGame = this.beginGame.bind(this);
  this.stuff = this.stuff.bind(this);
    
    this.state = {
      arr: [],
      currQuestion: 0,
      gameStart: false,
      loading:false,
      isLogin:true,
      yourTurn:true,
      titles: ["Matching","Match found!", "10 Rounds of personal trivia", "Choose your answer", "Now guess your match's answer","","", "Success! It's a match", "Darn, it was not a match"],
      transitionCount: 0
    }
  }

  getCurrQuestion = (currQuestion) => {
    this.setState({ currQuestion: currQuestion })
  }

  componentDidMount() {
    socket.emit('mymessage', "what's up");
    socket.on("getCurrQuestion", this.getCurrQuestion);
  }

  componentWillUnmount() {
    socket.off("getCurrQuestion", this.getCurrQuestion);
    socket.off("heyheyhey", this.getCurrQuestion);
  }

  checkAnswer(answer, correctAnswer) {
    // this method checks if the correct answer was selected     
    //sup
  }
  transitions (){
    this.setState({
      loading: true
    });
    console.log("start first")
    this.myInterval = setInterval(() => {
      this.setState({
        transitionCount: this.state.transitionCount+1
      });
      console.log("start second")
      this.myInterval = setInterval(() => {
        this.setState({
          transitionCount: this.state.transitionCount+1
        });
        console.log("start third")
        this.myInterval = setInterval(() => {
          this.setState({
            loading: false,
            gameStart: true,
            transitionCount: this.state.transitionCount+1
          });
        }, 2000)
      }, 2000)
  }, 2000)
    
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
      setTimeout(() => {
        this.setState({
          loading: false
        });
        this.setState(prevState => {
          this.stuff()
        
          if (this.state.yourTurn){
            this.setState({
              yourTurn: false
            });
            return {currQuestion: prevState.currQuestion}
          }
          else
            return {currQuestion: prevState.currQuestion + 1}

        })
      }, 2000)
    }, 10000)

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  beginGame(){
    this.state.isLogin=false;
    this.transitions()
  }  

  render () {
    if (this.state.loading)
        return (
            <div className="transition-screen"> 
            <h1>{this.state.titles[this.state.transitionCount]}</h1>
            </div>
        );
    if (this.state.isLogin)
          return (
            <div>
              <Formj/>
              <button onClick={this.beginGame}>Submit</button>
            </div>
          );
          
      const {
          quizData,
          rightAnswer,
      } = this.props;

      return (
        <div>
        <div>
          <Header/>
          <Timer/>
          <div className = "timer"></div>
          {this.jsonToArr(this.state.arr)}
          {this.state.gameStart ? (this.populateQuizCard(this.state.arr[this.state.currQuestion])) : (console.log("Exit"))}
        </div>
        </div>
      );
  }
}
