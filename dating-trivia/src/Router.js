import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Card from './card';
import Button from './button';
import Timer from './timer';
import { Header } from './socketHeader';
import { socket } from "./socketHeader";
import Formj from './form'; 
import Slider from "./slider";

let questionBank = require('./public/questions.json');
let arr = [];
let currQuestion = 0;
let yourResponse = "";
let theirResponse = "";

function jsonToArr(arr){
    Object.keys(questionBank).forEach(function (key) {
      arr.push(questionBank[key]);
    });
}

function populateQuizCard(record) {
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
}

function componentDidMount() {
    socket.emit('mymessage', "what's up");
    socket.on("getCurrQuestion", this.getCurrQuestion);
}

function componentWillUnmount() {
    socket.off("getCurrQuestion", this.getCurrQuestion);
    socket.off("heyheyhey", this.getCurrQuestion);
}

export const BasicExample = () => (
  <Router>
    <div>
    <Header/>
    <Redirect to="/form" />
      


    <Route path="/form" component={Form} />
    <Route path="/matching" component={Matching} />
    <Route path="/matchFound" component={MatchFound} />
    <Route exact path="/intro" component={Intro} />
    <Route path="/yourResponse" component={YourResponse} />
    <Route path="/question" component={Question} />
    <Route exact path="/theirResponse" component={TheirResponse} />
    <Route path="/theirQuestion" component={TheirQuestion} />
    <Route path="/result" component={Result} />
    <Route exact path="/interest" component={Interest} />
    <Route path="/success" component={Success} />
    <Route path="/fail" component={Fail} />

    </div>
  </Router>
);

const Form = () => (
    <div>
      <Formj/>
      <Link to="/matching">
        <button>Submit</button>
      </Link>
    </div>
);

function Matching(){
    const history = useHistory();
    setTimeout(() => {
        history.push('/matchFound')
    }, 2000);
    return  (
        <div>
            <p>Matching...</p>
        </div>
    )   
}


function MatchFound (){
    const history = useHistory();
    setTimeout(() => {
        history.push('/intro')
    }, 2000);
    return  (
        <div>
            <p>Match Found!</p>
        </div>
    )   
}

function Intro (){
    const history = useHistory();
    setTimeout(() => {
        history.push('/question')
    }, 2000);
    return  (
        <div>
            <h5><b>10 ROUNDS</b></h5>
            <p>PERSONAL TRIVIA</p>
            {jsonToArr(arr)}
        </div>
    )   
}


function YourResponse(){
    const history = useHistory();
    setTimeout(() => {
        history.push('/question')
    }, 2000);

    return  (
        <div>
            <p>PICK YOUR ANSWER</p>
        </div>
    )   
}

function Question (){

    const history = useHistory();
    setTimeout(() => {
        history.push('/theirResponse')
    }, 10000);

    return  (
        <div>
            <Timer/>
            <div className = "timer"></div>
            {console.log(currQuestion)}
            {populateQuizCard(arr[currQuestion])}
        </div>

    )   
}

function TheirResponse(){
    const history = useHistory();
    setTimeout(() => {
        history.push('/theirQuestion')
    }, 2000);

    return  (
        <div>
            <p>NOW GUESS THEIR ANSWER</p>
        </div>
    )   
}

function TheirQuestion (){

    const history = useHistory();
    setTimeout(() => {
        history.push('/result')
    }, 10000);

    return  (
        <div>
            <Timer/>
            <div className = "timer"></div>
            {populateQuizCard(arr[currQuestion])}
        </div>
    )   
}

function incrementCounter(){
    currQuestion = currQuestion +1;
}

function Result(){
    const history = useHistory();
    setTimeout(() => {
        // console.log(currQuestion)
        if (currQuestion < 3){
            history.push('/question')
        }
        else {
            history.push('./interest')
        }
    }, 3000);

    return  (
        <div>
            {incrementCounter()}
            <p>They chose</p>
            <p><b>{theirResponse}</b></p>
            <br/>
            <p>You chose</p>
            <p><b>{yourResponse}</b></p>
        </div>
    )  
}

function Interest () {
    return (
        <div>
            <p>GAME END</p>
            <p><b>How interested are you in them?</b></p>
            <Slider/>
            <Link to="/success">
                <button>Submit</button>
            </Link>
        </div>
    )
}

function Success(){
    return (
        <div>
            <h3><b>SUCCESS!</b></h3>
            <p>It's a match!</p>
        </div>
    )
}

function Fail(){
    return (
        <div>
            <h3><b>Darn.</b></h3>
            <p>It's not a match.</p>
        </div>
    )
}


export default BasicExample;




// export default class App extends React.Component {

//   constructor(props) {
//     super(props);
// //   this.beginGame = this.beginGame.bind(this);
// //   this.stuff = this.stuff.bind(this);
    
//     this.state = {
//       arr: [],
//       currQuestion: 0,
//       gameStart: true,
//       loading:false,
//       isLogin:true,
//       selectedValue: "",
//       yourTurn:true,
//       titles: [],
//       transitionCount: 1
//     }
//   }

//   getCurrQuestion = (currQuestion) => {
//     this.setState({ currQuestion: currQuestion })
//   }

//   componentDidMount() {
//     socket.emit('mymessage', "what's up");
//     socket.on("getCurrQuestion", this.getCurrQuestion);
//   }

//   componentWillUnmount() {
//     socket.off("getCurrQuestion", this.getCurrQuestion);
//     socket.off("heyheyhey", this.getCurrQuestion);
//   }

//   checkAnswer(answer, correctAnswer) {
//     // this method checks if the correct answer was selected     
//     //sup
//   }
//   transitions (){
//     this.state.titles = ["Matching","Match found!", "10 Rounds of personal trivia", "Choose your answer", "Now guess your match's answer","","", "Success! It's a match", "Darn, it was not a match"]
    
//   }

//   populateQuizCard = (record) => {
//       return (
//         <Card 
//           question={record.question}
//           a1={record.a1}
//           a2={record.a2}
//           a3={record.a3}
//           a4={record.a4}
//           correctAnswer={record.correct}
//         />
//       );
//   };

//   beginGame (){

//   }

//   jsonToArr(arr){
//     Object.keys(questionBank).forEach(function (key) {
//       arr.push(questionBank[key]);
//     });
//   }

//   componentDidMount() {
//     this.stuff()
//   }

//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }



//   render () {

//         return (
//         <div>
//             <Formj/>
//             <button onClick={this.beginGame}>Submit</button>
//         </div>
//         );

//       return (
//         <div>
//         <div>
//           <Header/>
//           <Timer/>
//           <div className = "timer"></div>
//           {this.jsonToArr(this.state.arr)}
//           {this.state.gameStart ? (this.populateQuizCard(this.state.arr[this.state.currQuestion])) : (console.log("Exit"))}
//         </div>
//         </div>
//       );
//   }
// }
