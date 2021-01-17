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
      selectedValue: "",
      yourTurn:true,
      titles: ["Matching","Match found!", "10 Rounds of personal trivia", "Choose your answer", "Now guess your match's answer","","", "Success! It's a match", "Darn, it was not a match"],
      transitionCount: 0
    }
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

  componentDidMount() {
    this.stuff();
    socket.on("connect", () => {
      console.log("hey i'm here");
      socket.emit('mymessage', "what's up");
    });
  }

  componentWillUnmount() {
    socket.off("mymessage", () => {console.log("i'm here")});
    clearInterval(this.interval);
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

  beginGame(){
    this.setState({isLogin: false})
    this.transitions()
  }

  setSelectedValue(value) {
    this.setState({
      selectedValue: value
    });
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
          <Header/>
          <Formj/>
          <button onClick={this.beginGame}>Submit</button>
        </div>
      );

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