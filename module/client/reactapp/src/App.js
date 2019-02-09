import React, { Component } from 'react';
import ChatLog from './ChatLog.js';
import InputBox from './InputBox';
import './App.css';
//import io from 'socket.io-client';

class App extends Component {
  componentDidMount() {
    //const socket = io("");
  }

  render() {
    const messages = [
      {username: "User 1", message: "Hey whats up"},
      {username: "User 2", message: "Pretty good, you?"}
    ];
    return (
      <div className="App">
        <ChatLog messages={messages}/>
        <InputBox/>
      </div>
    );
  }
}
export default App;
