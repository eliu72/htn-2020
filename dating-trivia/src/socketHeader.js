import React, { Component } from "react";
import socketIOClient from "socket.io-client";


let socket;
class Header extends Component {
/* Creating a Socket client and exporting it at the end to be used across components*/
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:8000/'
    };
    socket = socketIOClient(this.state.endpoint, {
      withCredentials: true
    });
  }
render() {
    return (
      <header>
        
      </header>
    );
  }
}
export { Header, socket };